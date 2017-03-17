const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('../models/user');

const artistSchema = new mongoose.Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    // required: [true, 'A name is required']
  },
  genre: [{
    type: String,
    // required: [true, 'At least one genre is required']
  }],
  location: {
    type: String,
    // required: [true, 'A general location is required']
  }
});

module.exports = mongoose.model('artist', artistSchema);
