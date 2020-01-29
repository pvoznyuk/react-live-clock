'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tickTimer = void 0;
var getDate = function getDate(date) {
  return date ? date : new Date().getTime();
};

var ReactLiveClock = function (_React$Component) {
  _inherits(ReactLiveClock, _React$Component);

  function ReactLiveClock() {
    _classCallCheck(this, ReactLiveClock);

    return _possibleConstructorReturn(this, (ReactLiveClock.__proto__ || Object.getPrototypeOf(ReactLiveClock)).apply(this, arguments));
  }

  _createClass(ReactLiveClock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.ticking) {
        tickTimer = setInterval(function () {
          _this2.forceUpdate();
        }, this.props.interval);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (tickTimer) {
        clearInterval(tickTimer);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          ago = _props.ago,
          children = _props.children,
          className = _props.className,
          date = _props.date,
          format = _props.format,
          from = _props.from,
          fromNow = _props.fromNow,
          locale = _props.locale,
          parse = _props.parse,
          timezone = _props.timezone,
          to = _props.to,
          toNow = _props.toNow,
          unix = _props.unix,
          filter = _props.filter,
          onChange = _props.onChange;


      return _react2.default.createElement(_reactMoment2.default, {
        ago: ago,
        className: className,
        date: getDate(date || children),
        filter: filter,
        format: format,
        from: from,
        fromNow: fromNow,
        locale: locale,
        onChange: onChange,
        parse: parse,
        to: to,
        toNow: toNow,
        tz: timezone,
        unix: unix });
    }
  }]);

  return ReactLiveClock;
}(_react2.default.Component);

exports.default = ReactLiveClock;


ReactLiveClock.propTypes = {
  ago: _propTypes2.default.bool,
  children: _propTypes2.default.string,
  className: _propTypes2.default.string,
  date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  format: _propTypes2.default.string,
  from: _propTypes2.default.string,
  fromNow: _propTypes2.default.bool,
  interval: _propTypes2.default.number,
  locale: _propTypes2.default.string,
  parse: _propTypes2.default.string,
  to: _propTypes2.default.string,
  toNow: _propTypes2.default.bool,
  unix: _propTypes2.default.bool,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string,
  filter: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};

ReactLiveClock.defaultProps = {
  ago: false,
  className: null,
  date: null,
  format: 'HH:mm',
  from: null,
  fromNow: false,
  interval: 1000,
  locale: null,
  parse: null,
  to: null,
  toNow: false,
  filter: function filter(d) {
    return d;
  },
  onChange: function onChange() {
    return null;
  },
  unix: false,
  ticking: false,
  timezone: null
};