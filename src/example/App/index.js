import React from 'react';
import Highlight from 'react-highlight.js';
import ReactFitText from 'react-fittext';
import Clock from '../..';
import css from './App.css';

const Panel = ({title, code, children}) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      <h4 className="panel-title" role="presentation">
        { title }
      </h4>
    </div>
    <div className="panel-body">
      <h6>Code:</h6>
      <Highlight language={'jsx'}>
        {code}
      </Highlight>
      <h6>Output:</h6>
      {children}
    </div>
  </div>
;

const App = () =>
  <div className={css.app}>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/flatly/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/atom-one-dark.min.css" />

    <h1>React Live Clock</h1>
    <p>Show Date/time for any timezone</p>
    <p><a href="https://github.com/pvoznyuk/react-live-clock">https://github.com/pvoznyuk/react-live-clock</a></p>

    <Panel
      title="Default clock. Shows current time (hours and minutes) in user's timezone."
      code="<Clock />">
      <Clock />
    </Panel>

    <Panel
      title="Ticking clock in with custom format, custom class and styles"
      code={`<Clock
      className={css.ukFormat}
      style={{fontSize: '1.5em'}}
      format={'h:mm:ssa'}
      ticking={true} />`}>
      <Clock
        className={css.ukFormat}
        style={{fontSize: '1.5em'}}
        format={'h:mm:ssa'}
        ticking={true} />
    </Panel>


    <Panel
      title="<Clock> inside <ReactFitText>"
      code={`<ReactFitText compressor={0.4}>
  <h1>
    <Clock format="HH:mm:ss" ticking={true} interval={1000} />
  </h1>
</ReactFitText>`}>
      <ReactFitText compressor={0.4}>
        <h1>
          <Clock format="HH:mm:ss" ticking={true} interval={1000} />
        </h1>
      </ReactFitText>
    </Panel>

    <Panel
      title="Ticking clock in timezone US/Pacific"
      code={`<Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'US/Pacific'} />`}>
      <Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'US/Pacific'} />
    </Panel>

    <Panel
      title="Output specific date"
      code={`<Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} />`}>
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} />
    </Panel>

    <Panel
      title="The same date in timezone Australia/Sydney"
      code={`<Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        timezone={'Australia/Sydney'} />`}>
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        timezone={'Australia/Sydney'} />
    </Panel>

    <Panel
      title="Date in the past that ticking"
      code={`<Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        ticking={true}
        timezone={'Australia/Sydney'} />`}>
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        ticking={true}
        timezone={'Australia/Sydney'} />
    </Panel>

    <Panel
      title="Filter the value before output."
      code="<Clock format={'HH:mm:ss'} ticking={true} filter={date => date.replace('8', '7a')} />">
      <Clock format={'HH:mm:ss'} ticking={true} filter={date => date.replace('8', '7a')} />
    </Panel>

    <Panel
      title="onChange event"
      code="<Clock format={'HH:mm:ss'} ticking={true} onChange={date => console.log(date)} />">
      <Clock format={'HH:mm:ss'} ticking={true} onChange={date => console.log(date.output)} />
    </Panel>

  </div>;

export default App;
