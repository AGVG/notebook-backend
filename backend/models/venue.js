const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('../models/user');

const venueSchema = new mongoose.Schema({
  _user: {
    type: Schema.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: [true, 'A name is required']
  },
  description: {
    type: String,
    // required: [true, 'A description is required']
  },
  location: {
    type: String,
    // required: [true, 'A location is required']
  },
  offer: {
    type: Boolean,
  }
});

module.exports = mongoose.model('venue', venueSchema);
