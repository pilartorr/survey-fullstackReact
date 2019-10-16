// imported Express Library and passport file
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./services/passport');


mongoose.connect(keys.mongoURI);

// Express Server App
const app = express();

// import the Authentication Routes Function into our Server App
require('./routes/authRoutes')(app);


// use port 5000 unless there exists a preconfigured port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
