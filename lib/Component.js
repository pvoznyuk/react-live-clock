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

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

require('moment-timezone');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function ReactLiveClock(props) {
  var locale = props.locale,
      timezone = props.timezone,
      date = props.date,
      format = props.format,
      interval = props.interval,
      ticking = props.ticking,
      onChange = props.onChange,
      blinking = props.blinking,
      className = props.className,
      style = props.style,
      filter = props.filter;

  var _useState = (0, _react.useState)(Date.now()),
      _useState2 = _slicedToArray(_useState, 2),
      currentTime = _useState2[0],
      setCurrentTime = _useState2[1];

  var _useState3 = (0, _react.useState)(format),
      _useState4 = _slicedToArray(_useState3, 2),
      formatToUse = _useState4[0],
      setFormatToUse = _useState4[1];

  var colonOn = true;

  function reverseString(str) {
    var splitString = str.split('');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join('');

    return joinArray;
  }

  (0, _react.useEffect)(function () {
    if (ticking || blinking) {
      var tick = setInterval(function () {
        var now = Date.now();

        if (blinking) {
          if (colonOn) {
            var newFormat = reverseString(format);

            newFormat = newFormat.replace(':', ' ');
            newFormat = reverseString(newFormat);

            colonOn = false;
            setFormatToUse(newFormat);
          } else {
            setFormatToUse(format);
            colonOn = true;
          }
        }

        if (ticking) {
          setCurrentTime(now);
        }

        if (typeof onChange === 'function') {
          onChange(now);
        }
      }, interval);

      return function () {
        return clearInterval(tick);
      };
    }

    return function () {
      return true;
    };
  }, [].concat(_toConsumableArray(props)));

  return _react2.default.createElement(
    _reactMoment2.default,
    {
      className: className,
      date: date,
      filter: filter,
      format: formatToUse,
      locale: locale,
      style: style,
      tz: timezone },
    currentTime
  );
}

ReactLiveClock.propTypes = {
  className: _propTypes2.default.string,
  date: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  blinking: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  format: _propTypes2.default.string,
  filter: _propTypes2.default.func,
  style: _propTypes2.default.object,
  interval: _propTypes2.default.number,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string,
  onChange: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func])
};

ReactLiveClock.defaultProps = {
  date: null,
  blinking: false,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null,
  onChange: false
};