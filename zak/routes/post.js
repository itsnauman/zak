var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/**
 * Post Details
 */
router.get('/:slug', function(req, res) {
    var slug = req.params.slug;

    Post.findOne({slug: slug}, function(err, post) {
        if (err)
            throw err;

        res.render('post', {
            title: post.title,
            post: post,
            user: req.user
        });
    });
});

/**
 * Comments
 */
router.post('/comment', function(req, res) {
    var comment = req.body.comment;
    var slug = req.body.slug;

    if (!req.isAuthenticated())
        return res.redirect('/post/' + slug);

    var newComment = new Comment({
        comment: comment,
        datePosted: new Date(),
        poster: req.user
    });

    newComment.save(function(err) {
        if (err) throw err;

        Post.findOne({slug: slug}, function(err, post) {
            if (err) throw err;

            post.comments.push(newComment);

            post.save(function(err) {
                if (err) throw err;
                res.redirect('/post/' + slug);
            });
        });
    });
});

/**
 * Delete Comment
 */
router.delete('/comment', function(req, res) {
    var id = req.body._id;
    var post_id = req.body.post_id;

    Comment.findByIdAndRemove(id, function(err) {
        if (err)
            throw err;

        Post.findOne({_id: post_id}, function(err, post) {
            if (err)
                throw err;

            post.comments = post.comments.filter(function(obj) {
                return String(obj._id) !== id;
            });

            post.save(function(err) {
                if (err)
                    throw err;

                res.sendStatus(200);
            });
        });
    });
});

module.exports = router;
