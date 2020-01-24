import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

let tickTimer;
const getDate = date => date ? date : new Date().getTime();

export default class ReactLiveClock extends React.Component {
  componentDidMount() {
    if (this.props.ticking) {
      tickTimer = setInterval(() => {
        this.forceUpdate();
      }, this.props.interval);
    }
  }

  componentWillUnmount() {
    if (tickTimer) {
      clearInterval(tickTimer);
    }
  }

  render() {
    const {ago, children, className, date, format, from, fromNow,
           locale, parse, timezone, to, toNow, unix, filter, onChange} = this.props;

    return (
      <Moment
        ago={ago}
        className={className}
        date={getDate(date || children)}
        filter={filter}
        format={format}
        from={from}
        fromNow={fromNow}
        locale={locale}
        onChange={onChange}
        parse={parse}
        to={to}
        toNow={toNow}
        tz={timezone}
        unix={unix} />
    );
  }
}

ReactLiveClock.propTypes = {
  ago: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  format: PropTypes.string,
  from: PropTypes.string,
  fromNow: PropTypes.bool,
  interval: PropTypes.number,
  locale: PropTypes.string,
  parse: PropTypes.string,
  to: PropTypes.string,
  toNow: PropTypes.bool,
  unix: PropTypes.bool,
  ticking: PropTypes.bool,
  timezone: PropTypes.string,
  filter: PropTypes.func,
  onChange: PropTypes.func
};

ReactLiveClock.defaultProps = {
  ago: false,
  className: null,
  date: null,
  format: 'HH:mm',
  from: null,
  fromNow: false,
  interval: 1000,
  locale: null,
  parse: null,
  to: null,
  toNow: false,
  filter: d => d,
  onChange: () => null,
  unix: false,
  ticking: false,
  timezone: null
};
