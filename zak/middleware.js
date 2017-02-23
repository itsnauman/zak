var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var flash = require("connect-flash");
var path = require('path');
var logger = require('morgan');
var express = require('express');

/**
 * Express middleware config
 */
module.exports = function(app, passport) {
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    // static middleware setup
    app.use(express.static(path.join(__dirname, 'public')));

    // cookie middleware setup
    app.use(cookieParser({
        secret: "6d7fss82d7fs",
        cookie: {
            maxAge: 1000 * 60 * 60 * 1000
        }
    }));

    app.use(cookieSession({
        name: 'passport-session',
        secret: '4dff2d23dc24566',
        secure: false, // For Now
        maxAge: 24 * 60 * 60 * 1000
    }));

    // passport for authentication setup
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    // setup logging with morgan
    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));
}