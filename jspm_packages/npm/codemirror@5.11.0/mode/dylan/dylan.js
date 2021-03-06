/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require('../../lib/codemirror'));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.defineMode("dylan", function(_config) {
    var words = {
      unnamedDefinition: ["interface"],
      namedDefinition: ["module", "library", "macro", "C-struct", "C-union", "C-function", "C-callable-wrapper"],
      typeParameterizedDefinition: ["class", "C-subtype", "C-mapped-subtype"],
      otherParameterizedDefinition: ["method", "function", "C-variable", "C-address"],
      constantSimpleDefinition: ["constant"],
      variableSimpleDefinition: ["variable"],
      otherSimpleDefinition: ["generic", "domain", "C-pointer-type", "table"],
      statement: ["if", "block", "begin", "method", "case", "for", "select", "when", "unless", "until", "while", "iterate", "profiling", "dynamic-bind"],
      separator: ["finally", "exception", "cleanup", "else", "elseif", "afterwards"],
      other: ["above", "below", "by", "from", "handler", "in", "instance", "let", "local", "otherwise", "slot", "subclass", "then", "to", "keyed-by", "virtual"],
      signalingCalls: ["signal", "error", "cerror", "break", "check-type", "abort"]
    };
    words["otherDefinition"] = words["unnamedDefinition"].concat(words["namedDefinition"]).concat(words["otherParameterizedDefinition"]);
    words["definition"] = words["typeParameterizedDefinition"].concat(words["otherDefinition"]);
    words["parameterizedDefinition"] = words["typeParameterizedDefinition"].concat(words["otherParameterizedDefinition"]);
    words["simpleDefinition"] = words["constantSimpleDefinition"].concat(words["variableSimpleDefinition"]).concat(words["otherSimpleDefinition"]);
    words["keyword"] = words["statement"].concat(words["separator"]).concat(words["other"]);
    var symbolPattern = "[-_a-zA-Z?!*@<>$%]+";
    var symbol = new RegExp("^" + symbolPattern);
    var patterns = {
      symbolKeyword: symbolPattern + ":",
      symbolClass: "<" + symbolPattern + ">",
      symbolGlobal: "\\*" + symbolPattern + "\\*",
      symbolConstant: "\\$" + symbolPattern
    };
    var patternStyles = {
      symbolKeyword: "atom",
      symbolClass: "tag",
      symbolGlobal: "variable-2",
      symbolConstant: "variable-3"
    };
    for (var patternName in patterns)
      if (patterns.hasOwnProperty(patternName))
        patterns[patternName] = new RegExp("^" + patterns[patternName]);
    patterns["keyword"] = [/^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/];
    var styles = {};
    styles["keyword"] = "keyword";
    styles["definition"] = "def";
    styles["simpleDefinition"] = "def";
    styles["signalingCalls"] = "builtin";
    var wordLookup = {};
    var styleLookup = {};
    ["keyword", "definition", "simpleDefinition", "signalingCalls"].forEach(function(type) {
      words[type].forEach(function(word) {
        wordLookup[word] = type;
        styleLookup[word] = styles[type];
      });
    });
    function chain(stream, state, f) {
      state.tokenize = f;
      return f(stream, state);
    }
    function tokenBase(stream, state) {
      var ch = stream.peek();
      if (ch == "'" || ch == '"') {
        stream.next();
        return chain(stream, state, tokenString(ch, "string"));
      } else if (ch == "/") {
        stream.next();
        if (stream.eat("*")) {
          return chain(stream, state, tokenComment);
        } else if (stream.eat("/")) {
          stream.skipToEnd();
          return "comment";
        } else {
          stream.skipTo(" ");
          return "operator";
        }
      } else if (/\d/.test(ch)) {
        stream.match(/^\d*(?:\.\d*)?(?:e[+\-]?\d+)?/);
        return "number";
      } else if (ch == "#") {
        stream.next();
        ch = stream.peek();
        if (ch == '"') {
          stream.next();
          return chain(stream, state, tokenString('"', "string-2"));
        } else if (ch == "b") {
          stream.next();
          stream.eatWhile(/[01]/);
          return "number";
        } else if (ch == "x") {
          stream.next();
          stream.eatWhile(/[\da-f]/i);
          return "number";
        } else if (ch == "o") {
          stream.next();
          stream.eatWhile(/[0-7]/);
          return "number";
        } else {
          stream.eatWhile(/[-a-zA-Z]/);
          return "keyword";
        }
      } else if (stream.match("end")) {
        return "keyword";
      }
      for (var name in patterns) {
        if (patterns.hasOwnProperty(name)) {
          var pattern = patterns[name];
          if ((pattern instanceof Array && pattern.some(function(p) {
            return stream.match(p);
          })) || stream.match(pattern))
            return patternStyles[name];
        }
      }
      if (stream.match("define")) {
        return "def";
      } else {
        stream.eatWhile(/[\w\-]/);
        if (wordLookup[stream.current()]) {
          return styleLookup[stream.current()];
        } else if (stream.current().match(symbol)) {
          return "variable";
        } else {
          stream.next();
          return "variable-2";
        }
      }
    }
    function tokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while ((ch = stream.next())) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = tokenBase;
          break;
        }
        maybeEnd = (ch == "*");
      }
      return "comment";
    }
    function tokenString(quote, style) {
      return function(stream, state) {
        var next,
            end = false;
        while ((next = stream.next()) != null) {
          if (next == quote) {
            end = true;
            break;
          }
        }
        if (end)
          state.tokenize = tokenBase;
        return style;
      };
    }
    return {
      startState: function() {
        return {
          tokenize: tokenBase,
          currentIndent: 0
        };
      },
      token: function(stream, state) {
        if (stream.eatSpace())
          return null;
        var style = state.tokenize(stream, state);
        return style;
      },
      blockCommentStart: "/*",
      blockCommentEnd: "*/"
    };
  });
  CodeMirror.defineMIME("text/x-dylan", "dylan");
});
