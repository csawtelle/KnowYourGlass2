var nodemailer = require('nodemailer');
var generator = require('generate-password');


exports.sendHash = function(req, res) {
  var password = generator.generate({
    length: 20,
    numbers: true
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
  transporter.sendMail({
			from: '"Know Your Glass" <admin@knowyourglass.com>',
			to: 'csawtelle01@gmail.com',
      bcc: 'admin@knowyourglass.com',
			subject: 'Please verify your registration.',
			html: '<p>Please login using your temporary password: ' + password + '</p>',
      text: 'Please login using your temporary password: ' + password + '</p>'
	});
  transporter.close();
};

