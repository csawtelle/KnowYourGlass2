var multer = require('multer');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var pageRoutes = require('./controllers/pageCtrl');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var app = express();

//jwt work
var jwt    = require('jsonwebtoken');
var User   = require('./models/jwtuser');
var Page   = require('./models/page');
app.set('superSecret','keyboardcatiscool'); //pulling config.js doesnt work wtf

app.get('/api', function(req, res) {
    res.send('Hello! The API is at http://knowyourglass.com/api');
});

app.get('/api/setup', function(req, res) {
  var admin = new User({ 
    name: 'admin', 
    password: 'admin',
    admin: true 
  });

  // save the sample user
  admin.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.post('/api/authenticate', function(req, res) {
  console.log("Token was requested");
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      console.log("User authentication for token request failed");
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password != req.body.password) {
        console.log("User was found but password was wrong. No token");
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        console.log("User was found and password is correct for token request");
        var token = jwt.sign(user, app.get('superSecret'), {
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
});

// route to return all users
router.get('/api/users', function(req, res) {
  console.log("User Information was queried");
  User.find({}, function(err, users) {
    res.json(users);
  });
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '500mb'}));
//app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));
app.use(flash());
mongoose.connect('mongodb://localhost:27017/kyg');

app.use(passport.initialize());
app.use(require('express-session')({
    secret: 'keyboard cat is cool guy',
    resave: true,
    saveUninitialized: true
}));

// Create endpoint handle for /page/
router.route('/api/pages')
  .post(pageRoutes.postPage)
  .get(pageRoutes.getPages);
// Create endpoint handlers for /pages/:page_id
router.route('/api/pages/:name')
  .get(pageRoutes.getPage)
  .put(pageRoutes.putPage)
  .delete(pageRoutes.deletePage);
//
// Create endpoint for file uploads
//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/build/KnowYourGlass2/src/app/images')
  }, 
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ 
    storage: storage,
    limits: { fileSize: 1000000000 }
});
app.post('/api/upload', upload.any(), function(req, res) {
    res.sendStatus(200);
});
//
//angular part of the web page
//

app.use(router);
app.get('*', function(req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
});
console.log('Listening - KYG Server has been started');
app.listen(8080);
