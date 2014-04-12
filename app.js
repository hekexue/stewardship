/**
 * Module dependencies.
 */

var express = require('express');
var service = require("./services");
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
service.init();
app.get("/service/index", service.index);
app.post("/service/index", service.index);

// app.get('/company',routers.company);
// app.get('/company/products',routers.products);
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});