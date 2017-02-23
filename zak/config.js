var config = {
    "production": {
        "facebook": {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_APP_SECRET,
            callbackURL: 'http://i6.cims.nyu.edu:14015/auth/facebook/return',
            profileFields: ['id', 'displayName', 'link', 'picture', 'emails', 'name']
        },
        mongodb: process.env.MONGO_URI
    },
    'development': {
        facebook: {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/return',
            profileFields: ['id', 'displayName', 'link', 'picture', 'emails', 'name']
        },
        mongodb: 'mongodb://localhost/zak'
    }
};

module.exports = config[process.env.NODE_ENV];
