var express       = require('express');
var router        = express.Router();
var jwt           = require('jsonwebtoken');
var jwtOptions    = require('../config/jwtOptions');

// Models
const User        = require("../models/user");
const Artist      = require("../models/artist");
const Venue       = require("../models/venue");
const Genre       = require("../models/genre");

// Bcrypt let us encrypt passwords
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;


router.post("/login", function(req, res) {

  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }

  if (username === "" || password === "") {
    res.status(401).json({message:"fill up the fields"});
    return;
  }

  User.findOne({ "username": username }, (err, user)=> {

  	if( ! user ){
	    res.status(401).json({message:"no such user found"});
	  } else {
      bcrypt.compare(password, user.password, function(err, isMatch) {
        console.log(isMatch);
        if (!isMatch) {
          res.status(401).json({message:"passwords did not match"});
        } else {
          var payload = {id: user._id};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({message: "ok", token: token});
        }
      });
    }
  })
});

router.post("/signup", (req, res, next) => {
  //Saving User
  var token;
  var username    = req.body.username;
  var password    = req.body.password;
  var type        = req.body.type;
  var name        = req.body.name;
  var description = req.body.description;
  var genre       = Array.isArray(req.body.genre) ? req.body.genre : [req.body.genre];
  var location    = req.body.location;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: 'user exist' });
      return;
    }

    var salt     = bcrypt.genSaltSync(bcryptSalt);
    var hashPass = bcrypt.hashSync(password, salt);

    var newUser = User({
      username,
      password: hashPass,
      type
    });
    //Saving Artist or Venue
      var _user       = newUser._id;

      if (newUser.type === "Artist"){
        var newArtist = Artist({ _user, name, genre, location});
        newArtist.save((err, artist) =>{
          if (err) {
            res.status(400).json({ message: err });
          }
        });
      } else if (newUser.type === "Venue") {
        var newVenue = Venue({ _user, name, description, location});
        newVenue.save((err, venue) =>{
          if (err) {
            res.status(400).json({ message: err });
          }
        });
      }
      newUser.save((err, user) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          var payload = {id: user._id};
          token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.status(200).json({message: "venue ok", token: token});
        }
      });
  });
});

router.get('/user', (req, res, next) => {
  User.find({})
    .exec((err, User) => {
      if (err) {
        return res.send(err);
      }
      return res.json(User);
    });
});



module.exports = router;
