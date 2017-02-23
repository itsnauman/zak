var mongoose = require('mongoose');
var sanitizer = require('mongoose-sanitizer');
var Schema = mongoose.Schema;

var UserSchema = require('./user');

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    comment: String,
    datePosted: Date,
    poster: UserSchema
});

// Sanitize user input
CommentSchema.plugin(sanitizer);

mongoose.model('Comment', CommentSchema);

module.exports = CommentSchema;
