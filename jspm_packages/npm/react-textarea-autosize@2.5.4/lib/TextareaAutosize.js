/* */ 
'use strict';
var _interopRequireWildcard = function(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
};
var _objectWithoutProperties = function(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i))
      continue;
    target[i] = obj[i];
  }
  return target;
};
var _classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
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
var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ('value' in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};
var _inherits = function(subClass, superClass) {
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
    subClass.__proto__ = superClass;
};
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
Object.defineProperty(exports, '__esModule', {value: true});
var _React = require('react');
var _React2 = _interopRequireWildcard(_React);
var _calculateNodeHeight = require('./calculateNodeHeight');
var _calculateNodeHeight2 = _interopRequireWildcard(_calculateNodeHeight);
var emptyFunction = function emptyFunction() {};
var TextareaAutosize = (function(_React$Component) {
  function TextareaAutosize(props) {
    _classCallCheck(this, TextareaAutosize);
    _get(Object.getPrototypeOf(TextareaAutosize.prototype), 'constructor', this).call(this, props);
    this.state = {
      height: null,
      minHeight: -Infinity,
      maxHeight: Infinity
    };
    this._onChange = this._onChange.bind(this);
    this._resizeComponent = this._resizeComponent.bind(this);
  }
  _inherits(TextareaAutosize, _React$Component);
  _createClass(TextareaAutosize, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var valueLink = _props.valueLink;
      var onChange = _props.onChange;
      var props = _objectWithoutProperties(_props, ['valueLink', 'onChange']);
      props = _extends({}, props);
      if (typeof valueLink === 'object') {
        props.value = this.props.valueLink.value;
      }
      props.style = _extends({}, props.style, {height: this.state.height});
      var maxHeight = Math.max(props.style.maxHeight ? props.style.maxHeight : Infinity, this.state.maxHeight);
      if (maxHeight < this.state.height) {
        props.style.overflow = 'hidden';
      }
      return _React2['default'].createElement('textarea', _extends({}, props, {onChange: this._onChange}));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._resizeComponent();
      window.addEventListener('resize', this._resizeComponent);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.clearNextFrame();
      this.onNextFrameActionId = onNextFrame(this._resizeComponent);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.height !== prevState.height) {
        this.props.onHeightChange(this.state.height);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.clearNextFrame();
      window.removeEventListener('resize', this._resizeComponent);
    }
  }, {
    key: 'clearNextFrame',
    value: function clearNextFrame() {
      if (this.onNextFrameActionId) {
        clearNextFrameAction(this.onNextFrameActionId);
      }
    }
  }, {
    key: '_onChange',
    value: function _onChange(e) {
      this._resizeComponent();
      var _props2 = this.props;
      var valueLink = _props2.valueLink;
      var onChange = _props2.onChange;
      if (valueLink) {
        valueLink.requestChange(e.target.value);
      } else {
        onChange(e);
      }
    }
  }, {
    key: '_resizeComponent',
    value: function _resizeComponent() {
      var useCacheForDOMMeasurements = this.props.useCacheForDOMMeasurements;
      this.setState(_calculateNodeHeight2['default'](_React2['default'].findDOMNode(this), useCacheForDOMMeasurements, this.props.rows || this.props.minRows, this.props.maxRows));
    }
  }, {
    key: 'value',
    get: function() {
      return _React2['default'].findDOMNode(this).value;
    }
  }, {
    key: 'focus',
    value: function focus() {
      _React2['default'].findDOMNode(this).focus();
    }
  }], [{
    key: 'propTypes',
    value: {
      value: _React2['default'].PropTypes.string,
      onChange: _React2['default'].PropTypes.func,
      onHeightChange: _React2['default'].PropTypes.func,
      useCacheForDOMMeasurements: _React2['default'].PropTypes.bool,
      rows: _React2['default'].PropTypes.number,
      minRows: _React2['default'].PropTypes.number,
      maxRows: _React2['default'].PropTypes.number
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      onChange: emptyFunction,
      onHeightChange: emptyFunction,
      useCacheForDOMMeasurements: false
    },
    enumerable: true
  }]);
  return TextareaAutosize;
})(_React2['default'].Component);
exports['default'] = TextareaAutosize;
function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}
module.exports = exports['default'];