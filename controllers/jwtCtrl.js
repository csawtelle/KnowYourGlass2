var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.createUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
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
      console.log("User not found.");
      res.json({ success: false, message: 'User not found' });
    } else if (user) {
      if (user.password != req.body.password) {
        console.log("Incorrect user password.");
        res.json({ success: false, message: 'Incorrect user password.' });
      } else {
        console.log("User authentication succeeded.");
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
  console.log("User query succeeded.");
  User.find({}, function(err, users) {
    res.json(users);
  });
};
exports.jwtCheck = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Token unverifiable.' });
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
