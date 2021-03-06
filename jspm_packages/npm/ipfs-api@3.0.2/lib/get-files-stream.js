/* */ 
'use strict';
var _typeof2 = require('babel-runtime/helpers/typeof');
var _typeof3 = _interopRequireDefault(_typeof2);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
var isNode = require('detect-node');
var Multipart = require('multipart-stream');
var flatmap = require('flatmap');
function headers(file) {
  var name = file.path || '';
  var header = {'Content-Disposition': 'file; filename="' + name + '"'};
  if (file.dir) {
    header['Content-Type'] = 'application/x-directory';
  } else if (file.symlink) {
    header['Content-Type'] = 'application/symlink';
  } else {
    header['Content-Type'] = 'application/octet-stream';
  }
  return header;
}
function strip(name, base) {
  var smallBase = base.split('/').slice(0, -1).join('/') + '/';
  return name.replace(smallBase, '');
}
function loadPaths(opts, file) {
  var path = require('path');
  var fs = require('fs');
  var glob = require('glob');
  var followSymlinks = opts.followSymlinks != null ? opts.followSymlinks : true;
  file = path.resolve(file);
  var stats = fs.statSync(file);
  if (stats.isDirectory() && !opts.recursive) {
    throw new Error('Can only add directories using --recursive');
  }
  if (stats.isDirectory() && opts.recursive) {
    var _ret = function() {
      var mg = new glob.sync.GlobSync(file + '/**/*', {follow: followSymlinks});
      return {v: mg.found.map(function(name) {
          if (mg.symlinks[name] === true) {
            return {
              path: strip(name, file),
              symlink: true,
              dir: false,
              content: fs.readlinkSync(name)
            };
          }
          if (mg.cache[name] === 'FILE') {
            return {
              path: strip(name, file),
              symlink: false,
              dir: false,
              content: fs.createReadStream(name)
            };
          }
          if (mg.cache[name] === 'DIR' || mg.cache[name] instanceof Array) {
            return {
              path: strip(name, file),
              symlink: false,
              dir: true
            };
          }
          return;
        }).filter(Boolean)};
    }();
    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object")
      return _ret.v;
  }
  return {
    path: file,
    content: fs.createReadStream(file)
  };
}
function getFilesStream(files, opts) {
  if (!files)
    return null;
  var mp = new Multipart();
  flatmap(files, function(file) {
    if (typeof file === 'string') {
      if (!isNode) {
        throw new Error('Can not add paths in node');
      }
      return loadPaths(opts, file);
    }
    if (file.path && (file.content || file.dir)) {
      return file;
    }
    return {
      path: '',
      symlink: false,
      dir: false,
      content: file
    };
  }).forEach(function(file) {
    mp.addPart({
      headers: headers(file),
      body: file.content
    });
  });
  return mp;
}
exports = module.exports = getFilesStream;
