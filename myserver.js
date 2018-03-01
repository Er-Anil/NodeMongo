// My server.js file //

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('./config/passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
require('./config/passport')(passport);
app.configure(function(){
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());

    app.set('view engine', 'ejs');
    app.use(express.session({secret: 'mysecretkey',resave:true,saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
});

require('./app/routes.js')(app, passport);

app.listen(7000);
console.log('The magic happens at port 7000 ');