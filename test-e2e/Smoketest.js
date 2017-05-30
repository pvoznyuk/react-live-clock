'use strict';

const path = require('path');
const packageJson = require(path.join(process.cwd(), 'package.json'));


module.exports = {
  'Smoketest'(browser) {
    browser
      .url(`${browser.launchUrl}/`)
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', packageJson.name)
      .end();
  }
};
