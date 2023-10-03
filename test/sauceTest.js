
module.exports = function(){
var webdriver = require('selenium-webdriver'),
    username = "vfsousa",
    accessKey = "383bec98-5d4f-4fe2-b498-1d08a1cec7ef",
    driver;
 
driver = new webdriver.Builder().
  withCapabilities({
    'name': 'tc03 access page',
    'browserName': 'chrome',
    'platform': 'Windows XP',
    'version': '43.0',
    'username': username,
    'accessKey': accessKey
  }).
  usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub").
  build();
 
driver.get("http://saucelabs.com/test/guinea-pig");
 
driver.getTitle().then(function (title) {
    console.log("title is: " + title);
});
 
driver.quit();
}