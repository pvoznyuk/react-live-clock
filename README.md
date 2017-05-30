# react-live-clock
React clock with time-zones

### Installing
Use npm to install react-react-live-clock

```sh
npm install --save react-live-clock
```


### Quick Start

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

** you can use any formatting from [moment](http://momentjs.com/) date library


### License
This software is released under the MIT license. See LICENSE for more details.

### Contributors

* [pvoznyuk](https://github.com/pvoznyuk)
