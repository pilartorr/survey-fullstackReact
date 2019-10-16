// *** Passport Flow: permission communication between our Server and Google ***

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

// The Users Class Model
const User = mongoose.model('users');

// Google-Strategy module configuration for the user-Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
      // save the data of every user into our MongoDB
    }
  )
);
