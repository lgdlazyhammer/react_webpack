var fs = require('fs');
var bodyParser = require('body-parser');
var formidable = require("formidable");
var util = require('util');
var url = require('url');
var qs = require('querystring');

module.exports = function(app){
	
	app.get('/',function(req,res){
		
		app.render('index.html',function(err, renderedData){
		})
	});
}