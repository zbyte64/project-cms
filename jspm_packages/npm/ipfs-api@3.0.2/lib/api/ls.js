/* */ 
'use strict';
var argCommand = require('../cmd-helpers').argCommand;
module.exports = function(send) {
  return argCommand(send, 'ls');
};
