// *** Passport Flow: permission communication between our Server and Google ***

// imported libraries and keys file
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Google-Strategy module configuration for the user-Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: 'keys.googleClientID',
      clienSecret: 'keys.googleClientSecret',
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);
