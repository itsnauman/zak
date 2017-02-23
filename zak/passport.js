var Strategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');

var User = mongoose.model('User');
var config = require('./config');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            return done(err, user);
        });
    });

    /**
     * Passsport authentication setup
     */
    passport.use(new Strategy(config.facebook, function(token, refreshToken, profile, done) {

        // Make it async
        process.nextTick(function() {
            User.findOne({'facebook_id': profile.id }, function(err, user) {

                if (err)
                    return done(err, { message: "Unable to login" });

                // if the user is found, then log them in
                if (user) {
                    return done(null, user);
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User({
                        facebook_id: profile.id,
                        facebook_token: token,
                        first_name: profile.name.givenName,
                        last_name: profile.name.familyName,
                        email: profile.emails[0].value,
                        profile_picture: 'https://graph.facebook.com/'+ profile.id + '/picture?width=9999'
                    });

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};
