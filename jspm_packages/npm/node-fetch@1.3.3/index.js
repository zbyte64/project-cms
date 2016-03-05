/* */ 
(function(Buffer) {
  var parse_url = require('url').parse;
  var resolve_url = require('url').resolve;
  var http = require('http');
  var https = require('https');
  var zlib = require('zlib');
  var stream = require('stream');
  var Response = require('./lib/response');
  var Headers = require('./lib/headers');
  var Request = require('./lib/request');
  module.exports = Fetch;
  function Fetch(url, opts) {
    if (!(this instanceof Fetch))
      return new Fetch(url, opts);
    if (!Fetch.Promise) {
      throw new Error('native promise missing, set Fetch.Promise to your favorite alternative');
    }
    Response.Promise = Fetch.Promise;
    var self = this;
    return new Fetch.Promise(function(resolve, reject) {
      var options;
      try {
        options = new Request(url, opts);
      } catch (err) {
        reject(err);
        return;
      }
      var send;
      if (options.protocol === 'https:') {
        send = https.request;
      } else {
        send = http.request;
      }
      var headers = new Headers(options.headers);
      if (options.compress) {
        headers.set('accept-encoding', 'gzip,deflate');
      }
      if (!headers.has('user-agent')) {
        headers.set('user-agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
      }
      if (!headers.has('connection')) {
        headers.set('connection', 'close');
      }
      if (!headers.has('accept')) {
        headers.set('accept', '*/*');
      }
      if (!headers.has('content-type') && options.body && typeof options.body.getBoundary === 'function') {
        headers.set('content-type', 'multipart/form-data; boundary=' + options.body.getBoundary());
      }
      if (!headers.has('content-length') && options.method.substr(0, 1).toUpperCase() === 'P') {
        if (typeof options.body === 'string') {
          headers.set('content-length', Buffer.byteLength(options.body));
        } else if (options.body === undefined || options.body === null) {
          headers.set('content-length', '0');
        }
      }
      options.headers = headers.raw();
      if (options.headers.host) {
        options.headers.host = options.headers.host[0];
      }
      var req = send(options);
      var reqTimeout;
      if (options.timeout) {
        req.once('socket', function(socket) {
          reqTimeout = setTimeout(function() {
            req.abort();
            reject(new Error('network timeout at: ' + options.url));
          }, options.timeout);
        });
      }
      req.on('error', function(err) {
        clearTimeout(reqTimeout);
        reject(new Error('request to ' + options.url + ' failed, reason: ' + err.message));
      });
      req.on('response', function(res) {
        clearTimeout(reqTimeout);
        if (self.isRedirect(res.statusCode)) {
          if (options.counter >= options.follow) {
            reject(new Error('maximum redirect reached at: ' + options.url));
            return;
          }
          if (!res.headers.location) {
            reject(new Error('redirect location header missing at: ' + options.url));
            return;
          }
          if (res.statusCode === 303 || ((res.statusCode === 301 || res.statusCode === 302) && options.method === 'POST')) {
            options.method = 'GET';
            delete options.body;
            delete options.headers['content-length'];
          }
          options.counter++;
          resolve(Fetch(resolve_url(options.url, res.headers.location), options));
          return;
        }
        var body = res.pipe(new stream.PassThrough());
        var headers = new Headers(res.headers);
        if (options.compress && headers.has('content-encoding')) {
          var name = headers.get('content-encoding');
          if (name == 'gzip' || name == 'x-gzip') {
            body = body.pipe(zlib.createGunzip());
          } else if (name == 'deflate' || name == 'x-deflate') {
            body = body.pipe(zlib.createInflate());
          }
        }
        var output = new Response(body, {
          url: options.url,
          status: res.statusCode,
          headers: headers,
          size: options.size,
          timeout: options.timeout
        });
        resolve(output);
      });
      if (typeof options.body === 'string') {
        req.write(options.body);
        req.end();
      } else if (typeof options.body === 'object' && options.body.pipe) {
        options.body.pipe(req);
      } else {
        req.end();
      }
    });
  }
  ;
  Fetch.prototype.isRedirect = function(code) {
    return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
  };
  Fetch.Promise = global.Promise;
  Fetch.Response = Response;
  Fetch.Headers = Headers;
  Fetch.Request = Request;
})(require('buffer').Buffer);
