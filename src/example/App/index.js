import React from 'react';
import ReactLiveClock from '../../ReactLiveClock';
import css from './App.css';

const App = () =>
  <div className={css.app}>
    <h4>Default clock</h4>
    <ReactLiveClock />

    <h4>Default ticking clock in UK locale and custom class</h4>
    <ReactLiveClock className={css.ukFormat} format={'LT'} ticking={true} />

    <h4>Ticking clock with seconds</h4>
    <ReactLiveClock format={'HH:mm:ss'} ticking={true} />

    <h4>Ticking clock in timezone US/Pacific
      <ReactLiveClock format={'(Z)'} timezone={'US/Pacific'} /></h4>
    <ReactLiveClock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />

    <h4>Specific date</h4>
    <ReactLiveClock date={'1997-12-31T14:15:23+01:00'} format={'llll'} />

    <h4>The same date in timezone US/Pacific</h4>
    <ReactLiveClock date={'1997-12-31T14:15:23+01:00'} format={'llll'} timezone={'US/Pacific'} />

    <h4>Time from now</h4>
    <ReactLiveClock fromNow={true} />

    <h4>Time from custom date</h4>
    <ReactLiveClock from="2000-01-01:00:00:00" />

    <h4>Unix format</h4>
    <ReactLiveClock unit={true} />

  </div>;

export default App;
