var express = require('express');
var bodyParser = require("body-parser");
var engines = require('consolidate')
var SauceLabs = require('saucelabs');
var CronJob = require('cron').CronJob;
// var loadash = require('loadash');
// var test = require('./test/sample_node')
// var test2 = require('./test/sauceTest')

// cfenv provides access to your Cloud Foundry environment
var cfenv = require('cfenv');

var app = express();

app.engine('html', engines.nunjucks)
app.set('view engine', 'html')
app.set('views', __dirname + '/views')

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));



// get the app environment from Cloud Foundry


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.get('/', function(req, res){
  // var cron = require('node-cron');
   res.render('index', {title: 'Login'})
})

// set global user for demo
app.use(function(req, res,next){
  app.locals.myAccount = setUser(req)
  next()
  return 
  
})

app.get('/home', function(req, res){
    res.render('home', {title: 'Home'})
})

app.get('/results', function(req, res){
    app.locals.myAccount.getJobs(function (err, result) {
      res.render('results', {jobs: result, title:'Results', dateConverter})
    })
})


app.get('/show-jobs', function(req, res){
  app.locals.myAccount.getJobs(function (err, result) {
    res.render('show-jobs', {jobs: result, title:'Results', dateConverter})
  })
})



app.get('/jobs/:id', function(req, res){
  app.locals.myAccount.showJob(req.params.id, function (err, result) {
    res.render('show-job', {job: result, title:'Job details', dateConverter})    
  })
})



app.get('/new-job', function(req, res){
    res.render('new-job', {title:'Job details'})    
})


app.post('/create-job', function(req, res){
    var times = req.body.times
    var minute = req.body.minute
    var timing = '*/'+minute +' * * * *'
    var i = 0
    var job = new CronJob({
      cronTime: timing,
     onTick: function() {
        i++
        if(i <= times ){       	          
          console.log('job started '  + i)
        } else{
            job.stop()
        }
       },
      onComplete: function(){
        console.log('job completed')
      },
      start: false,
      timeZone: 'America/Los_Angeles',
      runOnInit: true
    });
  job.start();
 var webdriver = require('selenium-webdriver');
   
  res.redirect('/show-jobs');
})


var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});




function setUser(req){
  var SauceLabs = require('saucelabs');
  var user = new SauceLabs({
    username: (req.query.user == 'inside' || req.query.user == undefined)  ? 'vfsousa' : req.query.user,
    password: (req.query.password == 'track' || req.query.user == undefined)  ? "383bec98-5d4f-4fe2-b498-1d08a1cec7ef" : req.query.password
  })
  return user
}

function dateConverter(date){
  var converted = new Date(date * 1000)
  return converted.toISOString();
}
