// *** Passport Flow: permission communication between our Server and Google ***

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// The Users Class Model
const User = mongoose.model('users');

// First: Generate a cookie-id into the data base to identify the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Second: Find this cookie-id in the Data Base to pull it back out and turn it back into user at some point in the future.
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Third: Identify the profile of the user in the Google-Provider when the user try to register or init section.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async(accessToken, refreshToken, profile, done) => {
      // find if the user already has a Google account
      const existingUser = await User.findOne({ googleId: profile.id });
      if(existingUser) {
        // confirm that the user already exists
        done(null, existingUser);
      } else {
        // if the user doesn't exist, create a new user, save it and check it was saved.
        const User = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
