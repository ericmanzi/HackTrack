// This file contains some borrowed code from the Notes Demo App

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('./utils/utils');
require('handlebars/runtime');
var mongoose = require('mongoose');

// import route handlers
var routes = require('./routes/index');
var users = require('./routes/users');
var projects = require('./routes/projects');
var tags = require('./routes/tags');
var User = require('./models/user');

var STRING_LENGTH = 16;


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to either the MONGOLAB_URI or to the local database.
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/hacktrack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret : utils.randString(STRING_LENGTH), resave : true, saveUninitialized : true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./utils/csrf'));

// Authentication middleware. This function
// is called on _every_ request and populates
// the req.currentUser field with the logged-in
// user object based off the username provided
// in the session variable (accessed by the
// encrypted cookies).
app.use(function(req, res, next) {
    if (req.session.username) {
        User.findByUsername(req.session.username,
            function(err, user) {
                if (user) req.currentUser = user;
                else req.session.destroy();
                next(); });
    } else next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/projects', projects);
app.use('/tags', tags);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = utils.STATUS_CODE_NOT_FOUND;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || utils.STATUS_CODE_UNKNOWN_ERROR);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || utils.STATUS_CODE_UNKNOWN_ERROR);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
