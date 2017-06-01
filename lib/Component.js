'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

var _loaded = require('timezone/loaded');

var _loaded2 = _interopRequireDefault(_loaded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tickTimer = void 0;
var getDate = function getDate(date) {
  return date ? new Date(date).getTime() : new Date().getTime();
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
          children = _props.children,
          className = _props.className,
          date = _props.date,
          format = _props.format,
          locale = _props.locale,
          timezone = _props.timezone;

      var dateValue = getDate(date || children);
      var utc = (0, _loaded2.default)(dateValue);
      var localizedTime = (0, _loaded2.default)(utc, '%x %X', locale, timezone);
      var formattedTime = (0, _dateformat2.default)(new Date(localizedTime), format);

      return _react2.default.createElement(
        'time',
        { className: className },
        formattedTime
      );
    }
  }]);

  return ReactLiveClock;
}(_react2.default.Component);

exports.default = ReactLiveClock;


ReactLiveClock.propTypes = {
  children: _propTypes2.default.string,
  className: _propTypes2.default.string,
  date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  format: _propTypes2.default.string,
  interval: _propTypes2.default.number,
  locale: _propTypes2.default.string,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string
};

ReactLiveClock.defaultProps = {
  className: null,
  date: null,
  format: 'HH:MM',
  interval: 1000,
  locale: 'en_US',
  ticking: false,
  timezone: null
};
//# sourceMappingURL=Component.js.map