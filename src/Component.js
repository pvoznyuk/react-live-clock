import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const getDate = date => date ? new Date(date).getTime() : new Date().getTime();

export default class ReactLiveClock extends React.Component {
  componentDidMount() {
    if (this.props.ticking) {
      this.tickTimer = setInterval(() => {
        this.forceUpdate();
      }, this.props.interval);
    }
  }

  componentWillUnmount() {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
  }

  render() {
    const {children, className, date, format, timezone} = this.props;
    const dateValue = getDate(date || children);
    const localizedTime = moment(dateValue);

    if (timezone) {
      localizedTime.tz(timezone);
    }

    const formattedTime = localizedTime.format(format);

    return (
      <time className={className}>{ formattedTime }</time>
    );
  }
}

ReactLiveClock.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
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
  className: null,
  date: null,
  format: 'HH:mm',
  interval: 1000,
  ticking: false,
  timezone: null
};
