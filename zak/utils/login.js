/**
 * Route middleware to make sure a user is logged in
 */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    req.flash('messages', 'You need to login first');
    res.redirect('/auth/login');
}

module.exports = {
    isLoggedIn: isLoggedIn
};