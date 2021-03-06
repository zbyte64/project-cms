/* */ 
'use strict';

module.exports = function (send) {
  return function mount(ipfs, ipns, cb) {
    if (typeof ipfs === 'function') {
      cb = ipfs;
      ipfs = null;
    } else if (typeof ipns === 'function') {
      cb = ipns;
      ipns = null;
    }
    var opts = {};
    if (ipfs) opts.f = ipfs;
    if (ipns) opts.n = ipns;
    return send('mount', null, opts, null, cb);
  };
};