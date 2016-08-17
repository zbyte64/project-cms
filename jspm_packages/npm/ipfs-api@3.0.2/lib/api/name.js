/* */ 
'use strict';
var argCommand = require('../cmd-helpers').argCommand;
module.exports = function(send) {
  return {
    publish: argCommand(send, 'name/publish'),
    resolve: argCommand(send, 'name/resolve')
  };
};
