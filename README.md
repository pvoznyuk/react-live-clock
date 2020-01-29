# react-live-clock [![npm](https://img.shields.io/npm/v/react-live-clock.svg?style=flat-square)](https://www.npmjs.com/package/react-live-clock)

[![Gitter](https://img.shields.io/gitter/room/pvoznyuk/help.svg?style=flat-square)](https://gitter.im/pvoznyuk/help)
[![Dependencies](https://img.shields.io/david/pvoznyuk/react-live-clock.svg?style=flat-square)](https://david-dm.org/pvoznyuk/react-live-clock)
[![Dev Dependencies](https://img.shields.io/david/dev/pvoznyuk/react-live-clock.svg?style=flat-square)](https://david-dm.org/pvoznyuk/react-live-clock#info=devDependencies)

React clock with time-zones
[DEMO](https://pvoznyuk.github.io/react-live-clock/)

## Installation

### NPM
```sh
npm install --save react react-live-clock
```

Don't forget to manually install peer dependencies (`react`) if you use npm@3.

## Demo

[http://pvoznyuk.github.io/react-live-clock](http://pvoznyuk.github.io/react-live-clock)


## Usage
```js
import React  from 'react';
import Clock from 'react-live-clock';

exports default class MyComponent extends React.Component {
    render() {
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Pacific'} />
    }
}
```

Outputs:

```html
<time>10:15:34</time>
```

 ** Shows current time for 'US/Pacific' timezone and updates every second


### Formatting

you can use any formatting from [moment.js](https://momentjs.com/docs/#/displaying/format/) date library

### Properties

| Propertie  | Type                | Default Value | Description |
|------------|---------------------|---------------|-------------|
| `date`     | timestamp or string | current date | Date to output, If nothing is set then it take current date. |
| `format`   | string              | 'HH:MM'       | Formatting from [moment.js](https://momentjs.com/docs/#/displaying/format/) library.
| `filter`   | function            | (date: String) => date      | Filtering the value before the output .
| `timezone` | string              | null          | If timezone is set, the date is show in this timezone. You can find the list. [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones), the TZ column.
| `ticking`  | boolean             | false         | If you want the clock to be auto-updated every `interval` seconds.
| `interval` | integer             | 1000          | Auto-updating period for the clock. 1 second is a default value.
| `className`| string              | null          | Extra class.
| `children` | string              | null          | `date` can be set as a children prop.
| `onChange` | function            | ({output, previousOutput, moment}) => {}         | callback function on each output update

## Development and testing

Currently is being developed and tested with the latest stable `Node 7` on `OSX` and `Windows`.

To run example covering all `ReactLiveClock` features, use `npm start dev`, which will compile `src/example/Example.js`

```bash
git clone git@github.com:pvoznyuk/react-live-clock.git
cd react-live-clock
npm install
npm start dev

# then
open http://localhost:8080
```

## Tests

```bash
# to run tests
npm start test

# to generate test coverage (./reports/coverage)
npm start test.cov

# to run end-to-end tests
npm start test.e2e
```

### License
This software is released under the MIT license. See LICENSE for more details.

### Contributors

* [pvoznyuk](https://github.com/pvoznyuk)
* [anthony0030](https://github.com/anthony0030)
