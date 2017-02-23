var express = require('express');
var mongoose = require('mongoose');
var _ = require('lodash');

var router = express.Router();
var Post = mongoose.model('Post');
var isLoggedIn = require('../utils/login').isLoggedIn;

/**
 * Home page
 */
router.get('/', function(req, res) {
    var query = {};
    var ordering = {'upvotes': -1};

    var searchQuery = req.query.query;
    var orderingQuery = req.query.ordering;

    if (searchQuery)
        query = {$text: {$search: searchQuery}};

    Post.find(query).sort(ordering).exec(function(err, posts) {
        if (err)
            throw err;

        res.render('index', {
            title: 'Welcome to Zak',
            posts: posts,
            user: req.user
        });
    });
});

/**
 * New Post
 */
router.get('/new-post', isLoggedIn, function(req, res) {
    res.render('new-post', {
        title: 'New Post',
        user: req.user
    });
});

/**
 * Create a new post
 */
router.post('/new-post', isLoggedIn, function(req, res) {
    var postTitle = req.body.title;
    var postURL = req.body.url;
    var postDescription = req.body.description;

    var post = new Post({
        title: postTitle,
        url: postURL,
        description: postDescription,
        upvotes: 0,
        datePosted: Date.now(),
        author: req.user
    });

    post.save(function(err) {
        // TODO: Implement flashing errors
        if (err)
            throw err;

        req.user.posts.push(post);
        req.user.save(function(err) {
            if (err)
                throw err;

            res.redirect('/');
        });
    });
});

/**
 * Delete a post
 */
router.delete('/post', isLoggedIn, function(req, res) {
    var id = req.body._id;

    Post.findByIdAndRemove(id, function(err) {
        if (err)
            throw err;

        req.user.posts = req.user.posts.filter(function(posts) {
            return String(posts._id) !== id;
        });

        req.user.save(function(err) {
            if (err)
                throw err;

            return res.sendStatus(200);
        });
    });
});

/**
 * Upvote
 */
router.post('/upvote', function(req, res) {
    if (!req.isAuthenticated())
        return res.sendStatus(401);

    var _id = req.body._id;
    Post.findOne({_id: _id}, function(err, post) {
        if (err)
            throw err;

        // Alow users to upvote a post only once
        if (_.includes(req.user.upvoted_posts, String(post._id)))
            return res.sendStatus(405);

        req.user.upvoted_posts.push(String(post._id));
        post.upvotes += 1;

        req.user.save(function(err) {
            if (err)
                throw err;

            post.save(function(err) {
                if (err)
                    throw err;

                res.sendStatus(200);
            });
        });
    });
});

module.exports = router;
