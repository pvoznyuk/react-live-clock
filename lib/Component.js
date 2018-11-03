'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BASE_UNIT = 'milliseconds';

var ReactLiveClock = function (_React$Component) {
  _inherits(ReactLiveClock, _React$Component);

  function ReactLiveClock(props) {
    _classCallCheck(this, ReactLiveClock);

    var _this = _possibleConstructorReturn(this, (ReactLiveClock.__proto__ || Object.getPrototypeOf(ReactLiveClock)).call(this, props));

    var date = props.date || props.children || null;
    var timesatmp = (0, _momentTimezone2.default)();
    var baseTime = date ? (0, _momentTimezone2.default)(new Date(date).getTime()) : timesatmp;

    _this.state = {
      realTime: !date,
      now: baseTime,
      baseTime: baseTime,
      startTime: timesatmp
    };
    return _this;
  }

  _createClass(ReactLiveClock, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          ticking = _props.ticking,
          interval = _props.interval;


      if (ticking && interval) {
        this.tickTimer = setInterval(function () {
          _this2.updateClock();
        }, interval);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.tickTimer) {
        clearInterval(this.tickTimer);
      }
    }
  }, {
    key: 'updateClock',
    value: function updateClock() {
      var realTime = this.state.realTime;


      if (realTime) {
        this.setState({
          now: (0, _momentTimezone2.default)()
        });
      } else {
        var _state = this.state,
            baseTime = _state.baseTime,
            startTime = _state.startTime;

        var newTime = (0, _momentTimezone2.default)();
        var diff = newTime.diff(startTime, BASE_UNIT);

        this.setState({
          now: baseTime.clone().add(diff, BASE_UNIT)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          format = _props2.format,
          timezone = _props2.timezone,
          restProps = _objectWithoutProperties(_props2, ['format', 'timezone']);

      var now = this.state.now;

      var localizedTime = now;

      if (timezone) {
        localizedTime.tz(timezone);
      }

      var formattedTime = localizedTime.format(format);

      var childProps = Object.keys(restProps).filter(function (key) {
        return !['date', 'interval', 'ticking'].includes(key);
      }).reduce(function (acc, key) {
        acc[key] = restProps[key];
        return acc;
      }, {});

      return _react2.default.createElement(
        'time',
        childProps,
        formattedTime
      );
    }
  }]);

  return ReactLiveClock;
}(_react2.default.Component);

exports.default = ReactLiveClock;


ReactLiveClock.propTypes = {
  children: _propTypes2.default.string,
  date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  format: _propTypes2.default.string,
  interval: _propTypes2.default.number,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string
};

ReactLiveClock.defaultProps = {
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null
};
//# sourceMappingURL=Component.js.map