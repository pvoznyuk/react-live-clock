import React from 'react';
import ReactLiveClock from '../..';
import css from './App.css';

const App = () =>
  <div className={css.app}>

    <h4>Default clock</h4>
    <ReactLiveClock />

    <h4>Default ticking clock in UK locale and custom class</h4>
    <ReactLiveClock className={css.ukFormat} format={'h:MM:sstt'} ticking={true} />

    <h4>Ticking clock with seconds</h4>
    <ReactLiveClock format={'HH:MM:ss'} ticking={true} />

    <h4>Ticking clock in timezone US/Pacific</h4>
    <ReactLiveClock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />

    <h4>Specific date</h4>
    <ReactLiveClock date={'1997-12-31T14:15:23+01:00'} format={'dddd, mmmm dS, yyyy, h:MM:ss TT'} />

    <h4>The same date in timezone US/Pacific</h4>
    <ReactLiveClock
      date={'1997-12-31T14:15:23+01:00'}
      format={'dddd, mmmm dS, yyyy, h:MM:ss TT'}
      timezone={'US/Pacific'} />

  </div>;

export default App;
