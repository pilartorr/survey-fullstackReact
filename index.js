const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect the server with data base through monso
mongoose.connect(keys.mongoURI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
  }
);

const app = express();

// Assign the value to bodyParse.req for every post-request to Stripe
app.use(bodyParser.json());
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

// import the Routes into our Server App
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// routing in production
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// use port 5000 unless there exists a preconfigured port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
