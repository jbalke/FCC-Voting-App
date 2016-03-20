'use strict';

var express = require('express');

var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');


var app = express();
if(process.env.NODE_ENV  !== 'production') require('dotenv').load();

require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGOLAB_URI);

app.use('/', express.static(process.cwd() + '/client/public'));


app.use(session({
	secret: process.env.SECRET_SESSION || 'secretClementine',
	resave: false,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);


var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});