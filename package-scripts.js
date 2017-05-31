const pathTo = require('path').join.bind(null, process.cwd());

exports.scripts = {
  dev: 'cross-env NODE_ENV=development webpack-dev-server',

  ghPages: [
    'npm start -- build.ghPages',
    'gh-pages --dist example'
  ].join(' && '),

  build: {
    default: [
      `rimraf ${pathTo('lib')} ${pathTo('example')} ${pathTo('build')}`,
      'npm start -- --parallel build.lib,build.ghPages,build.dist,build.min'
    ].join(' && '),
    lib: 'cross-env NODE_ENV=production' +
    `     babel ${pathTo('src')} --out-dir ${pathTo('lib')}` +
    `     --ignore ${pathTo('src', 'example')}`,
    ghPages: 'cross-env NODE_ENV=production BUILD=ghPages webpack',
    dist: 'cross-env NODE_ENV=production BUILD=dist webpack',
    min: 'cross-env NODE_ENV=production BUILD=min webpack'
  },

  lint: `eslint ${pathTo('.')} --fix`,

  test: {
    default: `cross-env NODE_ENV=test babel-node ${pathTo('test')}`,
    dev: 'npm start -- test | tap-nyan',
    cov: 'cross-env NODE_ENV=test' +
    '     babel-node node_modules/.bin/babel-istanbul cover' +
    `     --report text --report html --report lcov --dir reports/coverage ${pathTo('test')}`,
    e2e: 'cross-env NODE_ENV=development nightwatch-autorun'
  },

  // CircleCI scripts
  ci: {
    lint: `eslint ${pathTo('.')} --fix`,
    test: `cross-env NODE_ENV=test babel-node ${pathTo('test')}`
    // cov: 'cross-env NODE_ENV=test' +
    // '     babel-node node_modules/.bin/babel-istanbul cover' +
    // '     --report text --report lcov --verbose --dir ${CIRCLE_ARTIFACTS}/coverage' +
    // `     ${pathTo('test')}`,
    // e2e: 'cross-env REPORT_DIR=${CIRCLE_TEST_REPORTS} LOG_DIR=${CIRCLE_ARTIFACTS}' +
    // '     cross-env NODE_ENV=development nightwatch-autorun',
    // codecov: 'cat ${CIRCLE_ARTIFACTS}/coverage/lcov.info | codecov'
  },

  // GIT Hooks
  precommit: 'npm start -- lint',
  prepush: 'npm start -- test',

  // NPM Hooks
  postversion: 'git push --follow-tags',
  prepublish: 'npm start -- --parallel build.lib,build.dist,build.min'
};
