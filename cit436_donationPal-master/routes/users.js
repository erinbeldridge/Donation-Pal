var express = require('express');
var router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    niceUser = new User(req.user);
    console.log('Email: ' + req.user.emails[0].value);
    res.render('user-profile', { user: niceUser });
  } else {
    res.render('user-noprofile');
  }
});

/* GET login request */
// .get method has three parts: route, middleware, callback (optional)

router.get('/login',
 passport.authenticate('google', { scope: ['profile','email'] })
);

/* GET return request */
// .get method has three parts: route, middleware, callback (optional)

router.get('/return',
 //middleware
 passport.authenticate('google', { failureRedirect: './' }),
 //callback
 // When we have an authenticated user
 async function(req, res) {
   // See if the user is in our database
  var userExists = await User.checkUserExists(req.user.id);
  if (userExists == false) {
    var newUser = await User.addUser(req.user);
  }

   res.redirect('./');

 }
);

//GET logout request.
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('./');
});

//HELPER FUNCTIONS

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://8080-dot-10521728-dot-devshell.appspot.com/users/return'

  },
  function(accessToken, refreshToken, profile, callback) {
    // This will return the user's Google profile
    return callback(null, profile);
  })
);

passport.serializeUser(function(user, callback) {
    callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

module.exports = router;