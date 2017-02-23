var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var hbs = require('hbs');

var Humanize = require('./utils/datetime').Humanize;
var config = require('./config');

mongoose.connect(config.mongodb);

// Register mongoose models before moving on to routes
require('./models/post');
require('./models/user');
require('./models/comment');

// Import controllers
var index = require('./routes/index');
var auth  = require('./routes/auth');
var users = require('./routes/users');
var post  = require('./routes/post');

var app = express();

hbs.registerHelper('humanize', function(date) {
    var hum = new Humanize(date);
    return hum.humanizeDate();
});

hbs.registerHelper('isEqual', function(obj1, obj2) {
    return obj1.equals(obj2);
});

hbs.registerHelper('countComments', function(com) {
    return com.length;
})

// bootstrap middleware config
require('./middleware')(app, passport);

// bootstrap passport config
require('./passport')(passport);

// controller mounting
app.use('/', index);
app.use('/auth', auth);
app.use('/users', users);
app.use('/post', post);

// catch 404
app.use(function(req, res) {
    res.status(404);
    res.render('error');
});

module.exports = app;
