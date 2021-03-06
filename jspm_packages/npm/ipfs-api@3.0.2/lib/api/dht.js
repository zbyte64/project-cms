/* */ 
'use strict';
var _typeof2 = require('babel-runtime/helpers/typeof');
var _typeof3 = _interopRequireDefault(_typeof2);
var _promise = require('babel-runtime/core-js/promise');
var _promise2 = _interopRequireDefault(_promise);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var argCommand = require('../cmd-helpers').argCommand;
module.exports = function(send) {
  return {
    findprovs: argCommand(send, 'dht/findprovs'),
    get: function get(key, opts, cb) {
      if (typeof opts === 'function' && !cb) {
        cb = opts;
        opts = null;
      }
      var handleResult = function handleResult(done, err, res) {
        if (err)
          return done(err);
        if (!res)
          return done(new Error('empty response'));
        if (res.length === 0)
          return done(new Error('no value returned for key'));
        if (Array.isArray(res)) {
          res = res[0];
        }
        if (res.Type === 5) {
          done(null, res.Extra);
        } else {
          var error = new Error('key was not found (type 6)');
          done(error);
        }
      };
      if (typeof cb !== 'function' && typeof _promise2.default !== 'undefined') {
        var _ret = function() {
          var done = function done(err, res) {
            if (err)
              throw err;
            return res;
          };
          return {v: send('dht/get', key, opts).then(function(res) {
              return handleResult(done, null, res);
            }, function(err) {
              return handleResult(done, err);
            })};
        }();
        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")
          return _ret.v;
      }
      return send('dht/get', key, opts, null, handleResult.bind(null, cb));
    },
    put: function put(key, value, opts, cb) {
      if (typeof opts === 'function' && !cb) {
        cb = opts;
        opts = null;
      }
      return send('dht/put', [key, value], opts, null, cb);
    }
  };
};
