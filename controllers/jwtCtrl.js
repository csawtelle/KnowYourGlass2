var User = require('../models/user');
var jwt = require('jsonwebtoken');

exports.createUser = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log('password unhashed: ' + req.body.password);
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
	  if (err) { return callback(err); }
		// No user found with that username
		if (!user) { 
			console.log("User not found.");
			res.json({ success: false, message: 'User not found' });
		}
		// Make sure the password is correct
		user.verifyPassword(req.body.password, function(err, isMatch) {
			if (err) { 
				console.log('Compare password function failed. System Error.');
				res.json({ success: false, message: 'User not found.' });
			}
			// Password did not match
			if (!isMatch) { 
				console.log('Incorrect password. Authentication Error.');
				res.json({ success: false, message: 'Incorrect password.' });
			}
			if (isMatch) { 
				// Success
				console.log("User authentication succeeded.");
				var token = jwt.sign(user, 'superSecret', {
					expiresIn: 1440 // expires in 24 hours
				});
				res.json({
					success: true,
					message: 'User authentication succeeded.',
					token: token
				});
			}
	  });
  });
}

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
