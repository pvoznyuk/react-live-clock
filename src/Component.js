import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';

export default function ReactLiveClock(props) {
  const {
    blinking,
    className,
    date,
    element,
    filter,
    format,
    interval,
    locale,
    onChange,
    onReady,
    style,
    ticking,
    timezone
  } = props;


  const [startTime, setStartTime] = useState(Date.now()); // eslint-disable-line no-unused-vars
  const [currentTime, setCurrentTime] = useState(date ? new Date(date).getTime() : Date.now());
  const [formatToUse, setFormatToUse] = useState(format);
  const [noSsr, setNoSsr] = useState(props.noSsr);
  let colonOn = true;


  function reverseString(str) {
    const splitString = str.split('');
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join('');

    return joinArray;
  }


  useEffect(() => {
    if (noSsr && document) {
      setNoSsr(false);
    }
    if (typeof onReady === 'function') {
      onReady();
    }
  }, []);


  useEffect(() => {
    if (ticking || blinking) {
      const tick = setInterval(() => {
        let now = Date.now();

        if (date) {
          const difference = Date.now() - startTime;

          now = new Date(date).getTime() + difference;
        }

        if (blinking) {
          if (colonOn) {
            let newFormat = format;

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

      return () => clearInterval(tick);
    }

    return () => true;
  }, [...props]);


  if (noSsr) {
    return false;
  }

  return (
    <Moment
      className={className}
      date={ticking ? '' : date}
      element={element}
      filter={filter}
      format={formatToUse}
      locale={locale}
      style={style}
      tz={timezone}>
      {currentTime}
    </Moment>
  );
}

ReactLiveClock.propTypes = {
  className: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
    PropTypes.func
  ]),
  blinking: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['all'])
  ]),
  locale: PropTypes.string,
  format: PropTypes.string,
  filter: PropTypes.func,
  style: PropTypes.object,
  interval: PropTypes.number,
  ticking: PropTypes.bool,
  timezone: PropTypes.string,
  onChange: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  onReady: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func
  ]),
  noSsr: PropTypes.bool
};

ReactLiveClock.defaultProps = {
  date: null,
  element: 'time',
  blinking: false,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null,
  onChange: false,
  onReady: false,
  noSsr: false
};
