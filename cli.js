#!/usr/bin/env node


const config = require.resolve('react-live-clock/package-scripts');
const ps = require.resolve('p-s/dist/bin/nps');


require('child_process')
  .spawn('node', [ps, '--config', config].concat(process.argv.slice(2)), {
    cwd: process.cwd(),
    env: process.env,
    stdio: [process.stdin, process.stdout, process.stderr]
  });
