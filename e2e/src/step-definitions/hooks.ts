import {After, Before, Status} from 'cucumber';
import {browser} from 'protractor';
import * as fs from 'fs';

Before({tags: '@MediaViewer'}, async () => {
  await browser.waitForAngularEnabled(false);
  await browser.driver.navigate().to(browser.baseUrl);
});


After(async (scenario) => {
  if (scenario.result.status === Status.FAILED) {
    const screenshot = await browser.takeScreenshot();
    const stream = fs.createWriteStream('../../../reports/cucumber/fail.png');
    stream.write(new Buffer(screenshot, 'base64'));
    stream.end();
  }
});


