import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const BASE_UNIT = 'milliseconds';

export default class ReactLiveClock extends React.Component {
  constructor(props) {
    super(props);

    const date = props.date || props.children || null;
    const timesatmp = moment();
    const baseTime = date ? moment(new Date(date).getTime()) : timesatmp;

    this.state = {
      realTime: !date,
      now: baseTime,
      baseTime,
      startTime: timesatmp,
      formattedString: ''
    };
  }

  componentDidMount() {
    const {ticking, interval} = this.props;

    if (ticking && interval) {
      this.tickTimer = setInterval(() => {
        this.updateClock();
      }, interval);
    }
  }

  componentWillUnmount() {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
  }

  formatTime(time) {
    const {filter, format, timezone} = this.props;

    if (timezone) {
      time.tz(timezone);
    }

    const formattedTime = time.format(format);
    const filteredTime = filter(formattedTime);

    return filteredTime;
  }

  updateClock() {
    const {realTime, formattedString} = this.state;
    const {onChange} = this.props;
    let now;

    if (realTime) {
      now = moment();
    } else {
      const {baseTime, startTime} = this.state;
      const newTime = moment();
      const diff = newTime.diff(startTime, BASE_UNIT);

      now = baseTime.clone().add(diff, BASE_UNIT);
    }

    const formattedTime = this.formatTime(now);

    if (formattedTime !== formattedString) {
      onChange({
        moment: now,
        output: formattedTime,
        previousOutput: formattedString
      });
    }

    this.setState({
      now,
      formattedString: formattedTime
    });
  }

  render() {
    const {formattedString} = this.state;

    const childProps = Object.keys(this.props)
      .filter(key => !['date', 'interval', 'ticking', 'filter', 'format', 'timezone'].includes(key))
      .reduce((acc, key) => {
        acc[key] = this.props[key];
        return acc;
      }, {});

    return (
      <time {...childProps}>{ formattedString }</time>
    );
  }
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
