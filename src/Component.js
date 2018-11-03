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
      startTime: timesatmp
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

  updateClock() {
    const {realTime} = this.state;

    if (realTime) {
      this.setState({
        now: moment()
      });
    } else {
      const {baseTime, startTime} = this.state;
      const newTime = moment();
      const diff = newTime.diff(startTime, BASE_UNIT);

      this.setState({
        now: baseTime.clone().add(diff, BASE_UNIT)
      });
    }
  }

  render() {
    const {format, timezone, ...restProps} = this.props;
    const {now} = this.state;
    const localizedTime = now;

    if (timezone) {
      localizedTime.tz(timezone);
    }

    const formattedTime = localizedTime.format(format);

    const childProps = Object.keys(restProps)
      .filter(key => !['date', 'interval', 'ticking'].includes(key))
      .reduce((acc, key) => {
        acc[key] = restProps[key];
        return acc;
      }, {});

    return (
      <time {...childProps}>{ formattedTime }</time>
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
  timezone: PropTypes.string
};

ReactLiveClock.defaultProps = {
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null
};
