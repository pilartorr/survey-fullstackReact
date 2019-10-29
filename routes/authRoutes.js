// *** 2 Requires to access to the users information ***

const passport = require('passport');

// way to export our Authentication-Routes-Function to our Express Server App
module.exports = app => {
  // In the First request, Google returns a code number ?code=
  app.get(
    '/auth/google',
    passport.authenticate('google',{
      scope: ['profile', 'email']
    })
  );
  // In the second request, Google makes sure that the user grants permission to return the real information
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

};
