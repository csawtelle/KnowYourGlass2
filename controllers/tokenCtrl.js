var User = require('../models/user');
var jwt = require('jsonwebtoken');

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
				return res.json({ success: false, message: 'User not found.' });
			}
			// Password did not match
			if (!isMatch) { 
				console.log('Incorrect password. Authentication Error.');
				return res.json({ success: false, message: 'Incorrect password.' });
			}
			if (isMatch) { 
				// Success
				console.log("User authentication succeeded.");
				var token = jwt.sign(user, 'superSecret', {
					expiresIn: 1440 // expires in 24 hours
				});
				return res.json({
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
  if(req.query.search) {
    console.log("User Search query succeeded.");
    User.findOne({ 'username': req.query.search }, function(err, user) {
      if(err) {
				console.log('System Error');
				return res.json({ success: false, message: 'System Error.' });
      } else if(!user) {
				console.log('User not found');
				return res.json({ success: false, message: 'User not found.' });
      } else {
				return res.json({ success: true, username: user.username });
      }
    });
  } else {
    console.log("User query succeeded.");
    User.find({}, function(err, users) {
//      return res.json(users);
        return res.json("User not found.");
    });
  }
};

exports.verifyToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Token unverifiable.' });
      } else {
        return res.json({
          success: true,
          message: 'Valid Token.'
        })
      }
    });
  } else {
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
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
