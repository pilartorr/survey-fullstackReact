//*** MODEL INSTANCE FOR EVERY USER IN OUR DATA BASE***

const mongoose = require('mongoose');

// restructuring method to call the Squema Property of Mongoose
const { Schema } = mongoose;

// Instance of Squema Object to design our User's information for our data base.
const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// include the User's model into our users collection
mongoose.model('users', userSchema);
