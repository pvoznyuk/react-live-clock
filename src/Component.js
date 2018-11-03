import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const getDate = date => date ? new Date(date).getTime() : new Date().getTime();

export default class ReactLiveClock extends React.Component {
  componentDidMount() {
    const {ticking, interval} = this.props;

    if (ticking) {
      this.tickTimer = setInterval(() => {
        this.forceUpdate();
      }, interval);
    }
  }

  componentWillUnmount() {
    if (this.tickTimer) {
      clearInterval(this.tickTimer);
    }
  }

  render() {
    const {children, date, format, timezone, ...restProps} = this.props;
    const dateValue = getDate(date || children);
    const localizedTime = moment(dateValue);

    if (timezone) {
      localizedTime.tz(timezone);
    }

    const formattedTime = localizedTime.format(format);

    return (
      <time {...restProps}>{ formattedTime }</time>
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
