/* */ 
"use strict";
var _Object$keys = require('babel-runtime/core-js/object/keys')["default"];
var _getIterator = require('babel-runtime/core-js/get-iterator')["default"];
var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')["default"];
var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')["default"];
var _defaults = require('babel-runtime/helpers/defaults')["default"];
var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')["default"];
exports.__esModule = true;
exports.is = is;
exports.isType = isType;
exports.validate = validate;
exports.shallowEqual = shallowEqual;
exports.appendToMemberExpression = appendToMemberExpression;
exports.prependToMemberExpression = prependToMemberExpression;
exports.ensureBlock = ensureBlock;
exports.clone = clone;
exports.cloneWithoutLoc = cloneWithoutLoc;
exports.cloneDeep = cloneDeep;
exports.buildMatchMemberExpression = buildMatchMemberExpression;
exports.removeComments = removeComments;
exports.inheritsComments = inheritsComments;
exports.inheritTrailingComments = inheritTrailingComments;
exports.inheritLeadingComments = inheritLeadingComments;
exports.inheritInnerComments = inheritInnerComments;
exports.inherits = inherits;
exports.assertNode = assertNode;
exports.isNode = isNode;
var _toFastProperties = require('to-fast-properties');
var _toFastProperties2 = _interopRequireDefault(_toFastProperties);
var _lodashArrayCompact = require('lodash/array/compact');
var _lodashArrayCompact2 = _interopRequireDefault(_lodashArrayCompact);
var _lodashLangClone = require('lodash/lang/clone');
var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);
var _lodashCollectionEach = require('lodash/collection/each');
var _lodashCollectionEach2 = _interopRequireDefault(_lodashCollectionEach);
var _lodashArrayUniq = require('lodash/array/uniq');
var _lodashArrayUniq2 = _interopRequireDefault(_lodashArrayUniq);
require('./definitions/init');
var _definitions = require('./definitions/index');
var _react2 = require('./react');
var _react = _interopRequireWildcard(_react2);
var t = exports;
function registerType(type) {
  var is = t["is" + type] = function(node, opts) {
    return t.is(type, node, opts);
  };
  t["assert" + type] = function(node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error("Expected type " + JSON.stringify(type) + " with option " + JSON.stringify(opts));
    }
  };
}
var _constants = require('./constants');
_defaults(exports, _interopExportWildcard(_constants, _defaults));
exports.VISITOR_KEYS = _definitions.VISITOR_KEYS;
exports.ALIAS_KEYS = _definitions.ALIAS_KEYS;
exports.NODE_FIELDS = _definitions.NODE_FIELDS;
exports.BUILDER_KEYS = _definitions.BUILDER_KEYS;
exports.DEPRECATED_KEYS = _definitions.DEPRECATED_KEYS;
exports.react = _react;
for (var type in t.VISITOR_KEYS) {
  registerType(type);
}
t.FLIPPED_ALIAS_KEYS = {};
_lodashCollectionEach2["default"](t.ALIAS_KEYS, function(aliases, type) {
  _lodashCollectionEach2["default"](aliases, function(alias) {
    var types = t.FLIPPED_ALIAS_KEYS[alias] = t.FLIPPED_ALIAS_KEYS[alias] || [];
    types.push(type);
  });
});
_lodashCollectionEach2["default"](t.FLIPPED_ALIAS_KEYS, function(types, type) {
  t[type.toUpperCase() + "_TYPES"] = types;
  registerType(type);
});
var TYPES = _Object$keys(t.VISITOR_KEYS).concat(_Object$keys(t.FLIPPED_ALIAS_KEYS)).concat(_Object$keys(t.DEPRECATED_KEYS));
exports.TYPES = TYPES;
function is(type, node, opts) {
  if (!node)
    return false;
  var matches = isType(node.type, type);
  if (!matches)
    return false;
  if (typeof opts === "undefined") {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}
function isType(nodeType, targetType) {
  if (nodeType === targetType)
    return true;
  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType)
      return true;
    for (var _iterator = aliases,
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray ? _iterator : _getIterator(_iterator); ; ) {
      var _ref;
      if (_isArray) {
        if (_i >= _iterator.length)
          break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done)
          break;
        _ref = _i.value;
      }
      var alias = _ref;
      if (nodeType === alias)
        return true;
    }
  }
  return false;
}
_lodashCollectionEach2["default"](t.BUILDER_KEYS, function(keys, type) {
  function builder() {
    if (arguments.length > keys.length) {
      throw new Error("t." + type + ": Too many arguments passed. Received " + arguments.length + " but can receive no more than " + keys.length);
    }
    var node = {};
    node.type = type;
    var i = 0;
    for (var _iterator2 = (keys),
        _isArray2 = Array.isArray(_iterator2),
        _i2 = 0,
        _iterator2 = _isArray2 ? _iterator2 : _getIterator(_iterator2); ; ) {
      var _ref2;
      if (_isArray2) {
        if (_i2 >= _iterator2.length)
          break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done)
          break;
        _ref2 = _i2.value;
      }
      var key = _ref2;
      var field = t.NODE_FIELDS[type][key];
      var arg = arguments[i++];
      if (arg === undefined)
        arg = _lodashLangClone2["default"](field["default"]);
      node[key] = arg;
    }
    for (var key in node) {
      validate(node, key, node[key]);
    }
    return node;
  }
  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});
var _loop = function(type) {
  var proxy = function proxy(fn) {
    return function() {
      console.trace("The node type " + type + " has been renamed to " + newType);
      return fn.apply(this, arguments);
    };
  };
  var newType = t.DEPRECATED_KEYS[type];
  t[type] = t[type[0].toLowerCase() + type.slice(1)] = proxy(t[newType]);
  t["is" + type] = proxy(t["is" + newType]);
  t["assert" + type] = proxy(t["assert" + newType]);
};
for (var type in t.DEPRECATED_KEYS) {
  _loop(type);
}
function validate(node, key, val) {
  if (!node)
    return;
  var fields = t.NODE_FIELDS[node.type];
  if (!fields)
    return;
  var field = fields[key];
  if (!field || !field.validate)
    return;
  if (field.optional && val == null)
    return;
  field.validate(node, key, val);
}
function shallowEqual(actual, expected) {
  var keys = _Object$keys(expected);
  for (var _iterator3 = (keys),
      _isArray3 = Array.isArray(_iterator3),
      _i3 = 0,
      _iterator3 = _isArray3 ? _iterator3 : _getIterator(_iterator3); ; ) {
    var _ref3;
    if (_isArray3) {
      if (_i3 >= _iterator3.length)
        break;
      _ref3 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done)
        break;
      _ref3 = _i3.value;
    }
    var key = _ref3;
    if (actual[key] !== expected[key]) {
      return false;
    }
  }
  return true;
}
function appendToMemberExpression(member, append, computed) {
  member.object = t.memberExpression(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed;
  return member;
}
function prependToMemberExpression(member, prepend) {
  member.object = t.memberExpression(prepend, member.object);
  return member;
}
function ensureBlock(node) {
  var key = arguments.length <= 1 || arguments[1] === undefined ? "body" : arguments[1];
  return node[key] = t.toBlock(node[key], node);
}
function clone(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_")
      continue;
    newNode[key] = node[key];
  }
  return newNode;
}
function cloneWithoutLoc(node) {
  var newNode = clone(node);
  delete newNode.loc;
  return newNode;
}
function cloneDeep(node) {
  var newNode = {};
  for (var key in node) {
    if (key[0] === "_")
      continue;
    var val = node[key];
    if (val) {
      if (val.type) {
        val = t.cloneDeep(val);
      } else if (Array.isArray(val)) {
        val = val.map(t.cloneDeep);
      }
    }
    newNode[key] = val;
  }
  return newNode;
}
function buildMatchMemberExpression(match, allowPartial) {
  var parts = match.split(".");
  return function(member) {
    if (!t.isMemberExpression(member))
      return false;
    var search = [member];
    var i = 0;
    while (search.length) {
      var node = search.shift();
      if (allowPartial && i === parts.length) {
        return true;
      }
      if (t.isIdentifier(node)) {
        if (parts[i] !== node.name)
          return false;
      } else if (t.isStringLiteral(node)) {
        if (parts[i] !== node.value)
          return false;
      } else if (t.isMemberExpression(node)) {
        if (node.computed && !t.isStringLiteral(node.property)) {
          return false;
        } else {
          search.push(node.object);
          search.push(node.property);
          continue;
        }
      } else {
        return false;
      }
      if (++i > parts.length) {
        return false;
      }
    }
    return true;
  };
}
function removeComments(node) {
  for (var _iterator4 = t.COMMENT_KEYS,
      _isArray4 = Array.isArray(_iterator4),
      _i4 = 0,
      _iterator4 = _isArray4 ? _iterator4 : _getIterator(_iterator4); ; ) {
    var _ref4;
    if (_isArray4) {
      if (_i4 >= _iterator4.length)
        break;
      _ref4 = _iterator4[_i4++];
    } else {
      _i4 = _iterator4.next();
      if (_i4.done)
        break;
      _ref4 = _i4.value;
    }
    var key = _ref4;
    delete node[key];
  }
  return node;
}
function inheritsComments(child, parent) {
  inheritTrailingComments(child, parent);
  inheritLeadingComments(child, parent);
  inheritInnerComments(child, parent);
  return child;
}
function inheritTrailingComments(child, parent) {
  _inheritComments("trailingComments", child, parent);
}
function inheritLeadingComments(child, parent) {
  _inheritComments("leadingComments", child, parent);
}
function inheritInnerComments(child, parent) {
  _inheritComments("innerComments", child, parent);
}
function _inheritComments(key, child, parent) {
  if (child && parent) {
    child[key] = _lodashArrayUniq2["default"](_lodashArrayCompact2["default"]([].concat(child[key], parent[key])));
  }
}
function inherits(child, parent) {
  if (!child || !parent)
    return child;
  for (var _iterator5 = (t.INHERIT_KEYS.optional),
      _isArray5 = Array.isArray(_iterator5),
      _i5 = 0,
      _iterator5 = _isArray5 ? _iterator5 : _getIterator(_iterator5); ; ) {
    var _ref5;
    if (_isArray5) {
      if (_i5 >= _iterator5.length)
        break;
      _ref5 = _iterator5[_i5++];
    } else {
      _i5 = _iterator5.next();
      if (_i5.done)
        break;
      _ref5 = _i5.value;
    }
    var key = _ref5;
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }
  for (var key in parent) {
    if (key[0] === "_")
      child[key] = parent[key];
  }
  for (var _iterator6 = (t.INHERIT_KEYS.force),
      _isArray6 = Array.isArray(_iterator6),
      _i6 = 0,
      _iterator6 = _isArray6 ? _iterator6 : _getIterator(_iterator6); ; ) {
    var _ref6;
    if (_isArray6) {
      if (_i6 >= _iterator6.length)
        break;
      _ref6 = _iterator6[_i6++];
    } else {
      _i6 = _iterator6.next();
      if (_i6.done)
        break;
      _ref6 = _i6.value;
    }
    var key = _ref6;
    child[key] = parent[key];
  }
  t.inheritsComments(child, parent);
  return child;
}
function assertNode(node) {
  if (!isNode(node)) {
    throw new TypeError("Not a valid node " + (node && node.type));
  }
}
function isNode(node) {
  return !!(node && _definitions.VISITOR_KEYS[node.type]);
}
_toFastProperties2["default"](t);
_toFastProperties2["default"](t.VISITOR_KEYS);
var _retrievers = require('./retrievers');
_defaults(exports, _interopExportWildcard(_retrievers, _defaults));
var _validators = require('./validators');
_defaults(exports, _interopExportWildcard(_validators, _defaults));
var _converters = require('./converters');
_defaults(exports, _interopExportWildcard(_converters, _defaults));
var _flow = require('./flow');
_defaults(exports, _interopExportWildcard(_flow, _defaults));
