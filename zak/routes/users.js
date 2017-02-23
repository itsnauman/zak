var express = require('express');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var isLoggedIn = require('../utils/login').isLoggedIn;

var router = express.Router();

/**
 * User Profile
 */
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
        user: req.user,
        canModifyPosts: true
    });
});

router.get('/profile/:id', function(req, res) {
    var id = req.params.id;

    User.findById(id, function(err, user) {
        if (err)
            throw err;

        res.render('profile', {
            user: user,
            canModifyPosts: req.user._id.equals(user._id)
        });
    });
});

module.exports = router;