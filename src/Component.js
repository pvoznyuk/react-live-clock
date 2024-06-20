'use client';

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import momentTimezone from 'moment-timezone';

export default function ReactLiveClock(props) {
  const {
    blinking = false,
    className,
    date = null,
    element = 'time',
    filter,
    format = 'HH:mm',
    interval = 1000,
    locale,
    onChange = false,
    onReady = false,
    style,
    ticking = false,
    timezone = null
  } = props;


  const [startTime, setStartTime] = useState(Date.now()); // eslint-disable-line no-unused-vars
  const [currentTime, setCurrentTime] = useState(date ? new Date(date).getTime() : Date.now());
  const [formatToUse, setFormatToUse] = useState(format);
  const [noSsr, setNoSsr] = useState(props.noSsr || false);
  let colonOn = true;


  function reverseString(str) {
    const splitString = str.split('');
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join('');

    return joinArray;
  }


  useEffect(() => {
    momentTimezone.locale('locale');
  }, [locale]);

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
    PropTypes.object,
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
