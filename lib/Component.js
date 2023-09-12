'use strict';
'use client';

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
  var _props$blinking = props.blinking,
      blinking = _props$blinking === undefined ? false : _props$blinking,
      className = props.className,
      _props$date = props.date,
      date = _props$date === undefined ? null : _props$date,
      _props$element = props.element,
      element = _props$element === undefined ? 'time' : _props$element,
      filter = props.filter,
      _props$format = props.format,
      format = _props$format === undefined ? 'HH:mm' : _props$format,
      _props$interval = props.interval,
      interval = _props$interval === undefined ? 1000 : _props$interval,
      locale = props.locale,
      _props$onChange = props.onChange,
      onChange = _props$onChange === undefined ? false : _props$onChange,
      _props$onReady = props.onReady,
      onReady = _props$onReady === undefined ? false : _props$onReady,
      style = props.style,
      _props$ticking = props.ticking,
      ticking = _props$ticking === undefined ? false : _props$ticking,
      _props$timezone = props.timezone,
      timezone = _props$timezone === undefined ? null : _props$timezone;

  var _useState = (0, _react.useState)(Date.now()),
      _useState2 = _slicedToArray(_useState, 2),
      startTime = _useState2[0],
      setStartTime = _useState2[1]; // eslint-disable-line no-unused-vars


  var _useState3 = (0, _react.useState)(date ? new Date(date).getTime() : Date.now()),
      _useState4 = _slicedToArray(_useState3, 2),
      currentTime = _useState4[0],
      setCurrentTime = _useState4[1];

  var _useState5 = (0, _react.useState)(format),
      _useState6 = _slicedToArray(_useState5, 2),
      formatToUse = _useState6[0],
      setFormatToUse = _useState6[1];

  var _useState7 = (0, _react.useState)(props.noSsr || false),
      _useState8 = _slicedToArray(_useState7, 2),
      noSsr = _useState8[0],
      setNoSsr = _useState8[1];

  var colonOn = true;

  function reverseString(str) {
    var splitString = str.split('');
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join('');

    return joinArray;
  }

  (0, _react.useEffect)(function () {
    if (noSsr && document) {
      setNoSsr(false);
    }
    if (typeof onReady === 'function') {
      onReady();
    }
  }, []);

  (0, _react.useEffect)(function () {
    if (ticking || blinking) {
      var tick = setInterval(function () {
        var now = Date.now();

        if (date) {
          var difference = Date.now() - startTime;

          now = new Date(date).getTime() + difference;
        }

        if (blinking) {
          if (colonOn) {
            var newFormat = format;

            if (blinking === 'all') {
              newFormat = newFormat.replaceAll(':', ' ');
            } else {
              newFormat = reverseString(format);
              newFormat = newFormat.replace(':', ' ');
              newFormat = reverseString(newFormat);
            }

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

  if (noSsr) {
    return false;
  }

  return _react2.default.createElement(
    _reactMoment2.default,
    {
      className: className,
      date: ticking ? '' : date,
      element: element,
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
  element: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.node, _propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.func]),
  blinking: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.oneOf(['all'])]),
  locale: _propTypes2.default.string,
  format: _propTypes2.default.string,
  filter: _propTypes2.default.func,
  style: _propTypes2.default.object,
  interval: _propTypes2.default.number,
  ticking: _propTypes2.default.bool,
  timezone: _propTypes2.default.string,
  onChange: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  onReady: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
  noSsr: _propTypes2.default.bool
};