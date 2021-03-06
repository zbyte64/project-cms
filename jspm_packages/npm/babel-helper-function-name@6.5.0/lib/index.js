/* */ 
"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

var _interopRequireWildcard = require("babel-runtime/helpers/interop-require-wildcard")["default"];

exports.__esModule = true;

var _babelHelperGetFunctionArity = require("babel-helper-get-function-arity");

var _babelHelperGetFunctionArity2 = _interopRequireDefault(_babelHelperGetFunctionArity);

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

var buildPropertyMethodAssignmentWrapper = _babelTemplate2["default"]("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");

var buildGeneratorPropertyMethodAssignmentWrapper = _babelTemplate2["default"]("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n");

var visitor = {
  "ReferencedIdentifier|BindingIdentifier": function ReferencedIdentifierBindingIdentifier(path, state) {
    // check if this node matches our function id
    if (path.node.name !== state.name) return;

    // check that we don't have a local variable declared as that removes the need
    // for the wrapper
    var localDeclar = path.scope.getBindingIdentifier(state.name);
    if (localDeclar !== state.outerDeclar) return;

    state.selfReference = true;
    path.stop();
  }
};

function wrap(state, method, id, scope) {
  if (state.selfReference) {
    if (scope.hasBinding(id.name) && !scope.hasGlobal(id.name)) {
      // we can just munge the local binding
      scope.rename(id.name);
    } else {
      // we don't currently support wrapping class expressions
      if (!t.isFunction(method)) return;

      // need to add a wrapper since we can't change the references
      var build = buildPropertyMethodAssignmentWrapper;
      if (method.generator) build = buildGeneratorPropertyMethodAssignmentWrapper;
      var _template = build({
        FUNCTION: method,
        FUNCTION_ID: id,
        FUNCTION_KEY: scope.generateUidIdentifier(id.name)
      }).expression;
      _template.callee._skipModulesRemap = true;

      // shim in dummy params to retain function arity, if you try to read the
      // source then you'll get the original since it's proxied so it's all good
      var params = _template.callee.body.body[0].params;
      for (var i = 0, len = _babelHelperGetFunctionArity2["default"](method); i < len; i++) {
        params.push(scope.generateUidIdentifier("x"));
      }

      return _template;
    }
  }

  method.id = id;
  scope.getProgramParent().references[id.name] = true;
}

function visit(node, name, scope) {
  var state = {
    selfAssignment: false,
    selfReference: false,
    outerDeclar: scope.getBindingIdentifier(name),
    references: [],
    name: name
  };

  // check to see if we have a local binding of the id we're setting inside of
  // the function, this is important as there are caveats associated

  var binding = scope.getOwnBinding(name);

  if (binding) {
    if (binding.kind === "param") {
      // safari will blow up in strict mode with code like:
      //
      //   let t = function t(t) {};
      //
      // with the error:
      //
      //   Cannot declare a parameter named 't' as it shadows the name of a
      //   strict mode function.
      //
      // this isn't to the spec and they've invented this behaviour which is
      // **extremely** annoying so we avoid setting the name if it has a param
      // with the same id
      state.selfReference = true;
    } else {
      // otherwise it's defined somewhere in scope like:
      //
      //   let t = function () {
      //     let t = 2;
      //   };
      //
      // so we can safely just set the id and move along as it shadows the
      // bound function id
    }
  } else if (state.outerDeclar || scope.hasGlobal(name)) {
      scope.traverse(node, visitor, state);
    }

  return state;
}

exports["default"] = function (_ref) {
  var node = _ref.node;
  var parent = _ref.parent;
  var scope = _ref.scope;
  var id = _ref.id;

  // has an `id` so we don't need to infer one
  if (node.id) return;

  if ((t.isObjectProperty(parent) || t.isObjectMethod(parent, { kind: "method" })) && (!parent.computed || t.isLiteral(parent.key))) {
    // { foo() {} };
    id = parent.key;
  } else if (t.isVariableDeclarator(parent)) {
    // let foo = function () {};
    id = parent.id;

    if (t.isIdentifier(id)) {
      var binding = scope.parent.getBinding(id.name);
      if (binding && binding.constant && scope.getBinding(id.name) === binding) {
        // always going to reference this method
        node.id = id;
        node.id[t.NOT_LOCAL_BINDING] = true;
        return;
      }
    }
  } else if (t.isAssignmentExpression(parent)) {
    // foo = function () {};
    id = parent.left;
  } else if (!id) {
    return;
  }

  var name = undefined;
  if (id && t.isLiteral(id)) {
    name = id.value;
  } else if (id && t.isIdentifier(id)) {
    name = id.name;
  } else {
    return;
  }

  name = t.toBindingIdentifierName(name);
  id = t.identifier(name);

  // The id shouldn't be considered a local binding to the function because
  // we are simply trying to set the function name and not actually create
  // a local binding.
  id[t.NOT_LOCAL_BINDING] = true;

  var state = visit(node, name, scope);
  return wrap(state, node, id, scope) || node;
};

module.exports = exports["default"];