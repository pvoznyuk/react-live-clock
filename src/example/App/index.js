import React from 'react';
import PropTypes from 'prop-types';
import Highlight from 'react-highlight.js';
import ReactFitText from 'react-fittext';
import moment from 'moment-timezone';
import Clock from '../..';
import css from './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

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
  </div>;

Panel.propTypes = {
  title: PropTypes.string,
  code: PropTypes.string,
  children: PropTypes.node
};

const App = () =>
  <div className={css.app}>
    <link
      href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
      rel="stylesheet" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.7/flatly/bootstrap.min.css"
      rel="stylesheet" />
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/styles/atom-one-dark.min.css"
      rel="stylesheet" />

    <h1>React Live Clock</h1>
    <p>Show Date/time for any timezone</p>
    <p>
      <a href="https://github.com/pvoznyuk/react-live-clock">
        https://github.com/pvoznyuk/react-live-clock
      </a>
    </p>

    <Panel
      code="<Clock />"
      title="Default clock. Shows current time (hours and minutes) in user's timezone.">
      <Clock />
    </Panel>

    <Router>
      <Link to="/">Home</Link>
      <br />
      <Link to="/test">Test</Link>
      <Route exact={true} path="/" >
        <Panel
          code="<Clock format={'h:mm:ssa'} ticking={true} />"
          title="This is to test the components Cleanup function">
          <Clock format={'h:mm:ssa'} ticking={true} />
        </Panel>
      </Route>
    </Router>

    <Panel
      code={`
        <Clock
          className={css.ukFormat}
          format={'h:mm:ssa'}
          style={{fontSize: '1.5em'}}
          ticking={true} />
      `}
      title="Ticking clock in with custom format, custom class and styles">
      <Clock
        className={css.ukFormat}
        format={'h:mm:ssa'}
        style={{fontSize: '1.5em'}}
        ticking={true} />
    </Panel>


    <Panel
      code={`
        <ReactFitText compressor={0.4}>
          <h1>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>
        </ReactFitText>
      `}
      title="<Clock> inside <ReactFitText>">
      <ReactFitText compressor={0.4}>
        <h1>
          <Clock format="HH:mm:ss" interval={1000} ticking={true} />
        </h1>
      </ReactFitText>
    </Panel>

    <Panel
      code={`
        <Clock
          format={'HH:mm:ss'}
          ticking={true}
          timezone={'US/Pacific'} />
      `}
      title="Ticking clock in timezone US/Pacific">
      <Clock
        format={'HH:mm:ss'}
        ticking={true}
        timezone={'US/Pacific'} />
    </Panel>

    <Panel
      code={`
        <Clock
          date={'1997-12-31T14:15:23+01:00'}
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} />
      `}
      title="Output specific date">
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'} />
    </Panel>

    <Panel
      code={`
        <Clock
          date={'1997-12-31T14:15:23+01:00'}
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
          timezone={'Australia/Sydney'} />
      `}
      title="The same date in timezone Australia/Sydney">
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        timezone={'Australia/Sydney'} />
    </Panel>

    <Panel
      code={`
        <Clock
          date={'1997-12-31T14:15:23+01:00'}
          format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
          ticking={true}
          timezone={'Australia/Sydney'} />
      `}
      title="Date in the past that ticking">
      <Clock
        date={'1997-12-31T14:15:23+01:00'}
        format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}
        ticking={true}
        timezone={'Australia/Sydney'} />
    </Panel>

    <Panel
      code="<Clock filter={date => date.replace('8', '7a')} format={'HH:mm:ss'} ticking={true} />"
      title="Filter the value before output.">
      <Clock filter={date => date.replace('8', '7a')} format={'HH:mm:ss'} ticking={true} />
    </Panel>

    <Panel
      code="<Clock format={'HH:mm:ss'} ticking={true} onChange={date => console.log(date)} />"
      title="onChange event">
      <Clock
        format={'HH:mm:ss'}
        onChange={date =>
          console.log(date.output) // eslint-disable-line no-console
        }
        ticking={true} />
    </Panel>


    <Panel
      code="
        <Clock format={'HH:mm:ss a'} />
        <br />
        <button onClick={() => moment.locale('el')}>Make Greek</button>
      "
      title="Change the language on the fly">
      <Clock format={'HH:mm:ss a'} />
      <br />
      <button onClick={() => moment.locale('el')}>Make it Greek!</button>
    </Panel>


  </div>;

export default App;
