/* */ 
'use strict';
var cmds = require('../cmd-helpers');
module.exports = function(send) {
  var refs = cmds.argCommand(send, 'refs');
  refs.local = cmds.command(send, 'refs/local');
  return refs;
};