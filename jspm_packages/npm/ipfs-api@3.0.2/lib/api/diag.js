/* */ 
'use strict';
var command = require('../cmd-helpers').command;
module.exports = function(send) {
  return {
    net: command(send, 'diag/net'),
    sys: command(send, 'diag/sys'),
    cmds: command(send, 'diag/sys')
  };
};
