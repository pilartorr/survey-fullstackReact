// imported libraries
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// express server app
const app = express();

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

// first request to access to the users information through google strategy
// Google returns a code number ?code=
app.get(
  '/auth/google',
  passport.authenticate('google',{
    scope: ['profile', 'email']
  })
);

// second request to access to the real users information
// google makes sure that the user grants permission to the app
app.get('/auth/google/callback', passport.authenticate('google'));

// use port 5000 unless there exists a preconfigured port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
