var express    = require('express');
const mongoose = require('mongoose');
var router     = express.Router();
const Artist   = require('../models/artist');


/* GET Artist Listing */
router.get('/', (req, res, next) => {
  Artist.find({})
    .exec((err, Venues) => {
      if (err) {
        return res.send(err);
      }
      return res.json(Venues);
    });
});

router.get('/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  Artist.findById(req.params.id, (err, Artists) => {
      if (err) {
        return res.send(err);
      }
      console.log(Artists);
      return res.json(Artists);
    });
});

module.exports = router;
