/* */ 
(function() {
  var XMLNode,
      XMLRaw,
      create,
      extend = function(child, parent) {
        for (var key in parent) {
          if (hasProp.call(parent, key))
            child[key] = parent[key];
        }
        function ctor() {
          this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
      },
      hasProp = {}.hasOwnProperty;
  create = require('lodash/create');
  XMLNode = require('./XMLNode');
  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);
    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }
    XMLRaw.prototype.clone = function() {
      return create(XMLRaw.prototype, this);
    };
    XMLRaw.prototype.toString = function(options, level) {
      var indent,
          newline,
          offset,
          pretty,
          r,
          ref,
          ref1,
          ref2,
          space;
      pretty = (options != null ? options.pretty : void 0) || false;
      indent = (ref = options != null ? options.indent : void 0) != null ? ref : '  ';
      offset = (ref1 = options != null ? options.offset : void 0) != null ? ref1 : 0;
      newline = (ref2 = options != null ? options.newline : void 0) != null ? ref2 : '\n';
      level || (level = 0);
      space = new Array(level + offset + 1).join(indent);
      r = '';
      if (pretty) {
        r += space;
      }
      r += this.value;
      if (pretty) {
        r += newline;
      }
      return r;
    };
    return XMLRaw;
  })(XMLNode);
}).call(this);
