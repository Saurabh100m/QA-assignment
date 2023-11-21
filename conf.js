// conf.js
exports.config = {
  framework: "jasmine",
  seleniumAddress: "http://localhost:4444/wd/hub",
  specs: ["spec.js"],
  onPrepare: function () {
    browser.ignoreSynchronization = true; // Disable waiting for Angular
    // Implement any other setup steps you need
    var AllureReporter = require("jasmine-allure-reporter");
    jasmine.getEnv().addReporter(
      new AllureReporter({
        resultsDir: "allure-results",
      })
    );
  },
};
