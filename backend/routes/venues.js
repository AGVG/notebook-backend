var express    = require('express');
const mongoose = require('mongoose');
var router     = express.Router();
const Venue    = require('../models/venue');


/* GET Venue Listing */
router.get('/', (req, res, next) => {
  Venue.find({})
    .exec((err, Venues) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Venues);
    });
});

module.exports = router;
