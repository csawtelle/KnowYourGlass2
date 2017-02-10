var nodemailer = require('nodemailer');
var generator = require('generate-password');
var User = require('../models/user');
var TempUser = require('../models/tempUser');
var jwt = require('jsonwebtoken');

exports.createAccount = function(req, res) {
  console.log("Temporary account creation request received");
  var tempPassword = generator.generate({ length: 20, numbers: true });
  var email = req.body.email;
  var user = new TempUser({
    username: req.body.username,
    password: tempPassword,
    email: email
  });

  user.save(function(err) {
    if (err) throw err;
    console.log('Temporary User saved successfully');
    res.json({ success: true });
  });

  var transporter = nodemailer.createTransport({
	  host: 'mail.privateemail.com',
		port: '465',
		secure: true,
		auth: {
	    user: "admin@knowyourglass.com",
			pass: "KYG@99"
		},
    tls: {
        rejectUnauthorized: false
    }
  });
  console.log("Transporter created.");
  transporter.sendMail({
			from: '"Know Your Glass" <admin@knowyourglass.com>',
			to: email,
      bcc: 'admin@knowyourglass.com',
			subject: 'Please verify your registration.',
			html: '<p>Please login using your temporary password: ' + tempPassword + '</p>',
      text: 'Please login using your temporary password: ' + tempPassword + '</p>'
	});
  console.log("Mail sent.");
  transporter.close();
};

exports.verifyAccount = function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var tempPassword = req.body.tempPassword;
  var persistPassword = req.body.persistPassword;

  TempUser.findOne({
    username: username
  }, function(err, user) {
	  if (err) { return callback(err); }
		if (!user) {
      console.log("Temporary User not found.");
      res.json({ success: false, message: 'Temporary User not found' });
    }	
		user.verifyPassword(tempPassword, function(err, isMatch) {
			if (err) { 
				console.log('Compare password function failed. System Error.');
				res.json({ success: false, message: 'User not found.' });
			}
			if (!isMatch) { 
				console.log('Incorrect password. Authentication Error.');
				res.json({ success: false, message: 'Incorrect password.' });
			}
			if (isMatch) { 

        var user = new User({
          username: username,
          password: persistPassword,
          email: email
        });

        user.save(function(err) {
          if (err) throw err;
          console.log('User saved successfully');
          res.json({ success: true });
        });

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


