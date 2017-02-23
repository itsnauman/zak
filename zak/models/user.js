var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = require('./post');

/**
 * User Schema
 */
var UserSchema = new Schema({
    facebook_id: String,
    facebook_token: String,
    first_name: String,
    last_name: String,
    email: String,
    profile_picture: String,
    posts: [PostSchema],
    upvoted_posts: []
});

mongoose.model('User', UserSchema);

module.exports = UserSchema;
