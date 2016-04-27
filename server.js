//use express
var express = require('express');
//client use a favicon to identify a site
var favicon = require('serve-favicon');
//set express router
var app = express();
var session = require('express-session');
//import cookie parser
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var ejs = require('ejs');
var path = require('path');
//set multi cores
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var server_route = require('./server_route.js');
//get the server path
var appDir = path.dirname(require.main.filename);

//set static path for server
app.use(express.static(__dirname));
//use this to save session data
app.use(favicon(__dirname + '/public/favicon.ico'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//make the session available
app.use(cookieParser('foo'));

//set page engine
app.engine('html', ejs.__express);
app.set('view engine', 'html');
//set router
server_route(app);

console.log('app route-----'+appDir);
//set server options and start server
var options = { host:'localhost' };
//start multi cores
if (cluster.isMaster) {
	
	var workers = [];
	// Fork workers.
	for (var i = 0; i < numCPUs; i++) {
		var worker = cluster.fork();
		workers.push(worker.pid);
	}

	cluster.on('exit', function(worker, code, signal) {
		console.log('worker ' + worker.process.pid + ' died');
		var index = workers.indexOf(worker.pid);
		if (index != -1) {
			workers.splice(index, 1);
		}
		console.log(appName, 'worker', '#' + worker.pid, 'died');
		worker = cluster.fork();
		workers.push(worker.pid);
	});
  
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
	http.createServer(app).listen(8888);
}

process.on('uncaughtException', function (err) {
	logger.error(err+'\n');
});

process.on('exit', function(code) {
	/*logger.error('worker ' + this.pid + ' died'+code+'\n');
		var index = workers.indexOf(this.pid);
		if (index != -1) {
			workers.splice(index, 1);
		}
		worker = cluster.fork();
		workers.push(worker.pid);*/
});

