var User = require('../models/jwtuser');
var jwt = require('jsonwebtoken');

exports.createUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    admin: req.body.admin
  });

  // save the sample user
  user.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
};
exports.tokenRequest = function(req, res) {
  console.log("Token was requested");
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      console.log("User authentication for token request failed");
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      console.log(user);
      console.log(user.password);
      if (user.password != req.body.password) {
        console.log("User was found but password was wrong. No token");
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        console.log("User was found and password is correct for token request");
        var token = jwt.sign(user, 'superSecret', {
          expiresIn: 1440 // expires in 24 hours
        });
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
exports.jwtCheck = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
};
