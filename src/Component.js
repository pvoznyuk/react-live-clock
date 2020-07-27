import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export default function ReactLiveClock(props) {
  const {timezone, date, format, interval, ticking, onChange} = props;
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (ticking) {
      const tick = setInterval(() => {
        const now = Date.now();

        setCurrentTime(now);

        if (typeof onChange === 'function') {
          onChange(now);
        }
      }, interval);

      return () => clearInterval(tick);
    }

    return () => true;
  }, [...props]);


  return (
    <Moment
      date={date}
      format={format}
      tz={timezone}
    >
      {currentTime}
    </Moment>
  );
}

ReactLiveClock.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  format: PropTypes.string,
  interval: PropTypes.number,
  ticking: PropTypes.bool,
  timezone: PropTypes.string,
  onChange: PropTypes.func
};

ReactLiveClock.defaultProps = {
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null,
  onChange: false
};
