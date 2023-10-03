module.exports = function(){

var webdriver = require('selenium-webdriver'),
    username = "vfsousa",
    accessKey = "383bec98-5d4f-4fe2-b498-1d08a1cec7ef",
    By = webdriver.By,
    until = webdriver.until,
    driver;
var _ = require('underscore');
var VARS = {};

var globalTimeout = 60*1000;

driver = new webdriver.Builder().
  withCapabilities({
    'name': 'tc01-access page',
    'browserName': 'chrome',
    'platform': 'Windows XP',
    'version': '43.0',
    'username': username,
    'accessKey': accessKey
  }).
  usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub").
  build();

driver.controlFlow().on('uncaughtException', function(err) {
    console.log('There was an uncaught exception: ' + err);
});



driver.get("http://newtours.demoaut.com/"); 
driver.findElement(By.linkText("SIGN-ON")).click(); 
driver.findElement(By.name("userName")).clear(); 
driver.findElement(By.name("userName")).sendKeys("teste"); 
driver.findElement(By.name("password")).clear(); 
driver.findElement(By.name("password")).sendKeys("teste"); 
driver.findElement(By.xpath("//div/table/tbody/tr/td[2]/table/tbody/tr[4]/td/table/tbody/tr/td[2]/table/tbody/tr[5]/td/form/table/tbody/tr[4]/td")).click(); 
driver.findElement(By.name("login")).click(); 
driver.findElement(By.linkText("Home")).click(); 
driver.findElement(By.linkText("Flights")).click(); 
driver.findElement(By.linkText("Hotels")).click(); 
driver.findElement(By.linkText("Car Rentals")).click(); 
driver.findElement(By.linkText("Cruises")).click(); 
driver.findElement(By.linkText("Destinations")).click(); 
driver.findElement(By.linkText("Vacations")).click(); 
driver.findElement(By.linkText("SIGN-OFF")).click();  

driver.quit();
}