var express       = require('express');
var router        = express.Router();
const mongoose    = require('mongoose');
var jwt           = require('jsonwebtoken');
var jwtOptions    = require('../config/jwtOptions');

// Models
const User        = require("../models/user");
const Artist      = require("../models/artist");
const Venue       = require("../models/venue");

router.get('/', (req, res, next) => {
  User.find({})
    .exec((err, User) => {
      if (err) {
        return res.send(err);
      }
      return res.json(User);
    });
});

router.get('/:username', (req, res) => {

  User.findOne({ "username": req.params.username}, (err, user) => {
      if (err) { return res.send(err);
      }

        if (user.type === 'Artist'){
          Artist.findOne({_user: user._id}, (err, artist) =>{
            if (err) { return res.send(err);
            }
            console.log(artist);
            return res.json({'user' : user, 'artist': artist});
          });
        } else if (user.type === 'Venue'){
          Venue.findOne({_user: user._id}, (err, venue) =>{
            if (err) { return res.send(err);
            }
            console.log(venue);
            return res.json({'user' : user, 'venue': venue});
          });
        }
    });
});



module.exports = router;
