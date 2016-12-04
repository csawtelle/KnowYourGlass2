var User = require('../models/jwtuser');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();
app.set('superSecret', 'keyboardcatiscool');
exports.tokenRequest = function(req, res) {
  console.log("Token was requested");
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      console.log("User authentication for token request failed");
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        console.log("User was found but password was wrong. No token");
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        console.log("User was found and password is correct for token request");
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
      }

    }

  });
};

exports.apiWelcome = function(req, res) {
  res.json( { message: 'Welcome to the API!' } );
};
exports.returnUsers = function(req, res) {
  console.log("User Information was queried");
  User.find({}, function(err, users) {
    res.json(users);
  });
};

exports.jwtAuthCheck = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};
