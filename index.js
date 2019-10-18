const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect the server with data base
mongoose.connect(keys.mongoURI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
  }
);

const app = express();

// Tell Express that the browser must expire the Cookie-ID after 30 days.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 *60 * 1000,
    keys: [keys.cookiekey]
  })
);

// Tell Passport that it has to use cookie-session for the authentication of the users.
app.use(passport.initialize());
app.use(passport.session());

// import the Authentication Routes Function into our Server App
require('./routes/authRoutes')(app);

// use port 5000 unless there exists a preconfigured port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
