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
  CodeMirror.defineMode("tiddlywiki", function() {
    var textwords = {};
    var keywords = function() {
      function kw(type) {
        return {
          type: type,
          style: "macro"
        };
      }
      return {
        "allTags": kw('allTags'),
        "closeAll": kw('closeAll'),
        "list": kw('list'),
        "newJournal": kw('newJournal'),
        "newTiddler": kw('newTiddler'),
        "permaview": kw('permaview'),
        "saveChanges": kw('saveChanges'),
        "search": kw('search'),
        "slider": kw('slider'),
        "tabs": kw('tabs'),
        "tag": kw('tag'),
        "tagging": kw('tagging'),
        "tags": kw('tags'),
        "tiddler": kw('tiddler'),
        "timeline": kw('timeline'),
        "today": kw('today'),
        "version": kw('version'),
        "option": kw('option'),
        "with": kw('with'),
        "filter": kw('filter')
      };
    }();
    var isSpaceName = /[\w_\-]/i,
        reHR = /^\-\-\-\-+$/,
        reWikiCommentStart = /^\/\*\*\*$/,
        reWikiCommentStop = /^\*\*\*\/$/,
        reBlockQuote = /^<<<$/,
        reJsCodeStart = /^\/\/\{\{\{$/,
        reJsCodeStop = /^\/\/\}\}\}$/,
        reXmlCodeStart = /^<!--\{\{\{-->$/,
        reXmlCodeStop = /^<!--\}\}\}-->$/,
        reCodeBlockStart = /^\{\{\{$/,
        reCodeBlockStop = /^\}\}\}$/,
        reUntilCodeStop = /.*?\}\}\}/;
    function chain(stream, state, f) {
      state.tokenize = f;
      return f(stream, state);
    }
    function jsTokenBase(stream, state) {
      var sol = stream.sol(),
          ch;
      state.block = false;
      ch = stream.peek();
      if (sol && /[<\/\*{}\-]/.test(ch)) {
        if (stream.match(reCodeBlockStart)) {
          state.block = true;
          return chain(stream, state, twTokenCode);
        }
        if (stream.match(reBlockQuote)) {
          return 'quote';
        }
        if (stream.match(reWikiCommentStart) || stream.match(reWikiCommentStop)) {
          return 'comment';
        }
        if (stream.match(reJsCodeStart) || stream.match(reJsCodeStop) || stream.match(reXmlCodeStart) || stream.match(reXmlCodeStop)) {
          return 'comment';
        }
        if (stream.match(reHR)) {
          return 'hr';
        }
      }
      ch = stream.next();
      if (sol && /[\/\*!#;:>|]/.test(ch)) {
        if (ch == "!") {
          stream.skipToEnd();
          return "header";
        }
        if (ch == "*") {
          stream.eatWhile('*');
          return "comment";
        }
        if (ch == "#") {
          stream.eatWhile('#');
          return "comment";
        }
        if (ch == ";") {
          stream.eatWhile(';');
          return "comment";
        }
        if (ch == ":") {
          stream.eatWhile(':');
          return "comment";
        }
        if (ch == ">") {
          stream.eatWhile(">");
          return "quote";
        }
        if (ch == '|') {
          return 'header';
        }
      }
      if (ch == '{' && stream.match(/\{\{/)) {
        return chain(stream, state, twTokenCode);
      }
      if (/[hf]/i.test(ch)) {
        if (/[ti]/i.test(stream.peek()) && stream.match(/\b(ttps?|tp|ile):\/\/[\-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i)) {
          return "link";
        }
      }
      if (ch == '"') {
        return 'string';
      }
      if (ch == '~') {
        return 'brace';
      }
      if (/[\[\]]/.test(ch)) {
        if (stream.peek() == ch) {
          stream.next();
          return 'brace';
        }
      }
      if (ch == "@") {
        stream.eatWhile(isSpaceName);
        return "link";
      }
      if (/\d/.test(ch)) {
        stream.eatWhile(/\d/);
        return "number";
      }
      if (ch == "/") {
        if (stream.eat("%")) {
          return chain(stream, state, twTokenComment);
        } else if (stream.eat("/")) {
          return chain(stream, state, twTokenEm);
        }
      }
      if (ch == "_") {
        if (stream.eat("_")) {
          return chain(stream, state, twTokenUnderline);
        }
      }
      if (ch == "-") {
        if (stream.eat("-")) {
          if (stream.peek() != ' ')
            return chain(stream, state, twTokenStrike);
          if (stream.peek() == ' ')
            return 'brace';
        }
      }
      if (ch == "'") {
        if (stream.eat("'")) {
          return chain(stream, state, twTokenStrong);
        }
      }
      if (ch == "<") {
        if (stream.eat("<")) {
          return chain(stream, state, twTokenMacro);
        }
      } else {
        return null;
      }
      stream.eatWhile(/[\w\$_]/);
      var word = stream.current(),
          known = textwords.propertyIsEnumerable(word) && textwords[word];
      return known ? known.style : null;
    }
    function twTokenComment(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = jsTokenBase;
          break;
        }
        maybeEnd = (ch == "%");
      }
      return "comment";
    }
    function twTokenStrong(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "'" && maybeEnd) {
          state.tokenize = jsTokenBase;
          break;
        }
        maybeEnd = (ch == "'");
      }
      return "strong";
    }
    function twTokenCode(stream, state) {
      var sb = state.block;
      if (sb && stream.current()) {
        return "comment";
      }
      if (!sb && stream.match(reUntilCodeStop)) {
        state.tokenize = jsTokenBase;
        return "comment";
      }
      if (sb && stream.sol() && stream.match(reCodeBlockStop)) {
        state.tokenize = jsTokenBase;
        return "comment";
      }
      stream.next();
      return "comment";
    }
    function twTokenEm(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "/" && maybeEnd) {
          state.tokenize = jsTokenBase;
          break;
        }
        maybeEnd = (ch == "/");
      }
      return "em";
    }
    function twTokenUnderline(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "_" && maybeEnd) {
          state.tokenize = jsTokenBase;
          break;
        }
        maybeEnd = (ch == "_");
      }
      return "underlined";
    }
    function twTokenStrike(stream, state) {
      var maybeEnd = false,
          ch;
      while (ch = stream.next()) {
        if (ch == "-" && maybeEnd) {
          state.tokenize = jsTokenBase;
          break;
        }
        maybeEnd = (ch == "-");
      }
      return "strikethrough";
    }
    function twTokenMacro(stream, state) {
      var ch,
          word,
          known;
      if (stream.current() == '<<') {
        return 'macro';
      }
      ch = stream.next();
      if (!ch) {
        state.tokenize = jsTokenBase;
        return null;
      }
      if (ch == ">") {
        if (stream.peek() == '>') {
          stream.next();
          state.tokenize = jsTokenBase;
          return "macro";
        }
      }
      stream.eatWhile(/[\w\$_]/);
      word = stream.current();
      known = keywords.propertyIsEnumerable(word) && keywords[word];
      if (known) {
        return known.style, word;
      } else {
        return null, word;
      }
    }
    return {
      startState: function() {
        return {
          tokenize: jsTokenBase,
          indented: 0,
          level: 0
        };
      },
      token: function(stream, state) {
        if (stream.eatSpace())
          return null;
        var style = state.tokenize(stream, state);
        return style;
      },
      electricChars: ""
    };
  });
  CodeMirror.defineMIME("text/x-tiddlywiki", "tiddlywiki");
});
