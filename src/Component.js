import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const BASE_UNIT = 'milliseconds';

export default function ReactLiveClock(props) {
  const formatTime = time => {
    const {filter, format, timezone} = props;

    if (timezone) {
      time.tz(timezone);
    }

    const formattedTime = time.format(format);
    const filteredTime = filter(formattedTime);

    return filteredTime;
  };


  const date = props.date || props.children || null;
  const timestamp = moment();
  const InitialBaseTime = date ? moment(new Date(date).getTime()) : timestamp;

  const realTime = !date;
  let now = InitialBaseTime;
  const baseTime = InitialBaseTime;
  const startTime = timestamp;
  const [formattedString, setFormattedString] = useState(formatTime(now));
  const [tickTimer, setTickTimer] = useState(false);
  const [mounted, setMounted] = useState(false);

  const childProps = Object.keys(props)
  .filter(key => !['date', 'interval', 'ticking', 'filter', 'format', 'timezone'].includes(key))
  .reduce((acc, key) => {
    acc[key] = props[key];
    return acc;
  }, {});

  const clearMyInterval = interval => {
    if (interval) {
      clearInterval(tickTimer);
    }
  };

  const updateClock = () => {
    const {onChange} = props;
    let newNow;

    if (realTime) {
      newNow = moment();
    } else {
      const newTime = moment();
      const diff = newTime.diff(startTime, BASE_UNIT);

      newNow = baseTime.clone().add(diff, BASE_UNIT);
    }

    const newFormattedTime = formatTime(newNow);
    const formattedTime = formatTime(now);

    if (newFormattedTime !== formattedTime) {
      onChange({
        moment: newNow,
        output: formattedTime,
        previousOutput: formattedString
      });
      if (mounted) {
        setFormattedString(newFormattedTime);
      }
    }

    now = newNow;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const {ticking, interval} = props;

    if (ticking || interval) {
      if (tickTimer) {
        clearMyInterval(tickTimer);
      }
      const intervalId = setInterval(() => updateClock(), interval);

      setTickTimer(intervalId);
    }
    return () => clearMyInterval(tickTimer);
  }, [mounted]);


  return (
    <time {...childProps} >
      { formattedString }
    </time>
  );
}

ReactLiveClock.propTypes = {
  children: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  format: PropTypes.string,
  interval: PropTypes.number,
  ticking: PropTypes.bool,
  timezone: PropTypes.string,
  filter: PropTypes.func,
  onChange: PropTypes.func
};

ReactLiveClock.defaultProps = {
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null,
  filter: date => date,
  onChange: date => date
};
