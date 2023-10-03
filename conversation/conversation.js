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
	   res.render('showall', {title: 'showall'})
	})
	
app.get('/showall', function(req, res){
    app.locals.myAccount.getJobs(function (err, result) {
      res.render('shoall', {jobs: result, title:'showall', dateConverter})
    })
})
