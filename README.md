# react-live-clock [![npm](https://img.shields.io/npm/v/react-live-clock.svg?style=flat-square)](https://www.npmjs.com/package/react-live-clock)

[![Gitter](https://img.shields.io/gitter/room/pvoznyuk/help.svg?style=flat-square)](https://gitter.im/pvoznyuk/help)

[![CircleCI](https://img.shields.io/circleci/project/pvoznyuk/react-live-clock.svg?style=flat-square&label=nix-build)](https://circleci.com/gh/pvoznyuk/react-live-clock)
[![AppVeyor](https://img.shields.io/appveyor/ci/pvoznyuk/react-live-clock.svg?style=flat-square&label=win-build)](https://ci.appveyor.com/project/pvoznyuk/react-live-clock)
[![Coverage](https://img.shields.io/codecov/c/github/pvoznyuk/react-live-clock.svg?style=flat-square)](https://codecov.io/github/pvoznyuk/react-live-clock?branch=master)
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

### Bower:
```sh
bower install --save https://unpkg.com/react-live-clock/bower.zip
```

## Demo

[http://pvoznyuk.github.io/react-live-clock](http://pvoznyuk.github.io/react-live-clock)

## Codepen demo

```js
// TODO
```

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

 ** Shows current time for 'US/Pacific' timezine and updats every second


 ### Formatting

 ```js
 import React  from 'react';
 import Clock from 'react-live-clock';

 exports default class MyComponent extends React.Component {
     render() {
         <Clock format="YYYY/MM/DD">1976-04-19T12:59-0500</Clock>
     }
 }
 ```

 Outputs:

 ```html
 <time>1976/04/19</time>
 ```

 ** you can use any formatting from [node-dateformat](https://github.com/felixge/node-dateformat) date library



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
