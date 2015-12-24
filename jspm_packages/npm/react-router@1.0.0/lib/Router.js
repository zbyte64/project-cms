/* */ 
(function(process) {
  'use strict';
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {'default': obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var _warning = require('warning');
  var _warning2 = _interopRequireDefault(_warning);
  var _react = require('react');
  var _react2 = _interopRequireDefault(_react);
  var _historyLibCreateHashHistory = require('history/lib/createHashHistory');
  var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);
  var _RouteUtils = require('./RouteUtils');
  var _RoutingContext = require('./RoutingContext');
  var _RoutingContext2 = _interopRequireDefault(_RoutingContext);
  var _useRoutes = require('./useRoutes');
  var _useRoutes2 = _interopRequireDefault(_useRoutes);
  var _PropTypes = require('./PropTypes');
  var _React$PropTypes = _react2['default'].PropTypes;
  var func = _React$PropTypes.func;
  var object = _React$PropTypes.object;
  var Router = (function(_Component) {
    _inherits(Router, _Component);
    _createClass(Router, null, [{
      key: 'propTypes',
      value: {
        history: object,
        children: _PropTypes.routes,
        routes: _PropTypes.routes,
        RoutingContext: func.isRequired,
        createElement: func,
        onError: func,
        onUpdate: func,
        parseQueryString: func,
        stringifyQuery: func
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {RoutingContext: _RoutingContext2['default']},
      enumerable: true
    }]);
    function Router(props, context) {
      _classCallCheck(this, Router);
      _Component.call(this, props, context);
      this.state = {
        location: null,
        routes: null,
        params: null,
        components: null
      };
    }
    Router.prototype.handleError = function handleError(error) {
      if (this.props.onError) {
        this.props.onError.call(this, error);
      } else {
        throw error;
      }
    };
    Router.prototype.componentWillMount = function componentWillMount() {
      var _this = this;
      var _props = this.props;
      var history = _props.history;
      var children = _props.children;
      var routes = _props.routes;
      var parseQueryString = _props.parseQueryString;
      var stringifyQuery = _props.stringifyQuery;
      var createHistory = history ? function() {
        return history;
      } : _historyLibCreateHashHistory2['default'];
      this.history = _useRoutes2['default'](createHistory)({
        routes: _RouteUtils.createRoutes(routes || children),
        parseQueryString: parseQueryString,
        stringifyQuery: stringifyQuery
      });
      this._unlisten = this.history.listen(function(error, state) {
        if (error) {
          _this.handleError(error);
        } else {
          _this.setState(state, _this.props.onUpdate);
        }
      });
    };
    Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;
    };
    Router.prototype.componentWillUnmount = function componentWillUnmount() {
      if (this._unlisten)
        this._unlisten();
    };
    Router.prototype.render = function render() {
      var _state = this.state;
      var location = _state.location;
      var routes = _state.routes;
      var params = _state.params;
      var components = _state.components;
      var _props2 = this.props;
      var RoutingContext = _props2.RoutingContext;
      var createElement = _props2.createElement;
      var props = _objectWithoutProperties(_props2, ['RoutingContext', 'createElement']);
      if (location == null)
        return null;
      Object.keys(Router.propTypes).forEach(function(propType) {
        return delete props[propType];
      });
      return _react2['default'].createElement(RoutingContext, _extends({}, props, {
        history: this.history,
        createElement: createElement,
        location: location,
        routes: routes,
        params: params,
        components: components
      }));
    };
    return Router;
  })(_react.Component);
  exports['default'] = Router;
  module.exports = exports['default'];
})(require('process'));