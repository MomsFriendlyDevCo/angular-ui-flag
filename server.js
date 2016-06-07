#!/usr/bin/env node
/**
* Extremely simple static website serving script
* This is provided in case you need to deploy a quick demo
*
* Install + run:
*
* 		# from parent directory
*
*		cd demo
*		npm install
*		node server
*
*/


var root = __dirname + '/..';
var express = require('express');
global.app = express();

app.get('/', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

app.get('/js/angular-ui-flag.js', function(req, res) {
	res.sendFile('angular-ui-flag.js', {root: root});
});

app.use('/node_modules', express.static(root + '/node_modules'));
app.use('/css', express.static(root + '/demo/css'));
app.use('/js', express.static(root + '/demo/js'));
app.use('/svg', express.static(root + '/svg'));

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.send(500, 'Something broke!').end();
});

var port = process.env.PORT || process.env.VMC_APP_PORT || 80;
var server = app.listen(port, function() {
	console.log('Web interface listening on port', port);
});
