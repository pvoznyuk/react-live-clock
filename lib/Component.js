'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ReactLiveClock;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_UNIT = 'milliseconds';

function ReactLiveClock(props) {
  var formatTime = function formatTime(time) {
    var filter = props.filter,
        format = props.format,
        timezone = props.timezone;


    if (timezone) {
      time.tz(timezone);
    }

    var formattedTime = time.format(format);
    var filteredTime = filter(formattedTime);

    return filteredTime;
  };

  var date = props.date || props.children || null;
  var timestamp = (0, _momentTimezone2.default)();
  var InitialBaseTime = date ? (0, _momentTimezone2.default)(new Date(date).getTime()) : timestamp;

  var realTime = !date;
  var now = InitialBaseTime;
  var baseTime = InitialBaseTime;
  var startTime = timestamp;

  var _useState = (0, _react.useState)(formatTime(now)),
      _useState2 = _slicedToArray(_useState, 2),
      formattedString = _useState2[0],
      setFormattedString = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      tickTimer = _useState4[0],
      setTickTimer = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      mounted = _useState6[0],
      setMounted = _useState6[1];

  var childProps = Object.keys(props).filter(function (key) {
    return !['date', 'interval', 'ticking', 'filter', 'format', 'timezone'].includes(key);
  }).reduce(function (acc, key) {
    acc[key] = props[key];
    return acc;
  }, {});

  var updateClock = function updateClock() {
    var onChange = props.onChange;

    var newNow = void 0;

    if (realTime) {
      newNow = (0, _momentTimezone2.default)();
    } else {
      var newTime = (0, _momentTimezone2.default)();
      var diff = newTime.diff(startTime, BASE_UNIT);

      newNow = baseTime.clone().add(diff, BASE_UNIT);
    }

    var newFormattedTime = formatTime(newNow);
    var formattedTime = formatTime(now);

    if (newFormattedTime !== formattedTime) {
      onChange({
        moment: newNow,
        output: formattedTime,
        previousOutput: formattedString
      });
      setFormattedString(newFormattedTime);
    }

    now = newNow;
  };

  (0, _react.useEffect)(function () {
    var ticking = props.ticking,
        interval = props.interval;


    if (ticking || interval) {
      if (!mounted) {
        var intervalId = setInterval(function () {
          return updateClock();
        }, interval);

        setTickTimer(intervalId);
        setMounted(true);
      }
    }
    return function () {
      return tickTimer && clearInterval(tickTimer);
    };
  }, []);

  return _react2.default.createElement(
    'time',
    childProps,
    formattedString
  );
}

ReactLiveClock.propTypes = {
  children: _propTypes2.default.string,
  date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  format: _propTypes2.default.string,
  interval: _propTypes2.default.number,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string,
  filter: _propTypes2.default.func,
  onChange: _propTypes2.default.func
};

ReactLiveClock.defaultProps = {
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null,
  filter: function filter(date) {
    return date;
  },
  onChange: function onChange(date) {
    return date;
  }
};