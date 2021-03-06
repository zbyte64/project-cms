/* */ 
'use strict';

module.exports = function (send) {
  return function id(idParam, cb) {
    if (typeof idParam === 'function') {
      cb = idParam;
      idParam = null;
    }
    return send('id', idParam, null, null, cb);
  };
};