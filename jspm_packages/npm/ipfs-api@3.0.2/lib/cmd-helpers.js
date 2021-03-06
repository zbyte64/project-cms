/* */ 
'use strict';

exports.command = function command(send, name) {
  return function (opts, cb) {
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }
    return send(name, null, opts, null, cb);
  };
};

exports.argCommand = function argCommand(send, name) {
  return function (arg, opts, cb) {
    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }
    return send(name, arg, opts, null, cb);
  };
};