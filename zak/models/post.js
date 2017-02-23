var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');
var sanitizer = require('mongoose-sanitizer');

var UserSchema = require('./user');
var CommentSchema = require('./comment');

var Schema = mongoose.Schema;

/**
 * Post Schema
 */
var PostSchema = new Schema({
    title: String,
    url: String,
    description: String,
    upvotes: Number,
    datePosted: Date,
    author: UserSchema,
    comments: [CommentSchema]
});

PostSchema.index({title: 'text', url: 'text', description: 'text'});
PostSchema.plugin(URLSlugs('title'));
PostSchema.plugin(sanitizer);

mongoose.model('Post', PostSchema);

module.exports = PostSchema;
