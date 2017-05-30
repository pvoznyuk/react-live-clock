import React from 'react';
import ReactLiveClock from '../../ReactLiveClock';
import css from './App.css';

const App = () =>
  <div className={css.app}>
    <ReactLiveClock format={'HH:mm:ss'} ticking={true} />
  </div>;

export default App;
