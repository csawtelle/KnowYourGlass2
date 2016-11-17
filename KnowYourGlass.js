var multer = require('multer');
var express = require('express');

var authController = require('./controllers/authCtrl');
var oauth2Controller = require('./controllers/auth2Ctrl');
var clientController = require('./controllers/clientCtrl');
var userController = require('./controllers/userCtrl');

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
app.set('superSecret','keyboardcatiscool'); //pulling config.js doesnt work wtf

app.get('/api', function(req, res) {
    res.send('Hello! The API is at http://knowyourglass.com/api');
});



app.get('/api/setup', function(req, res) {

  // create a sample user
  var gerry = new User({ 
    name: 'Gerry Ramos', 
    password: 'admin',
    admin: true 
  });

  // save the sample user
  gerry.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});

router.get('/api2', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

router.get('/api2/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


router.post('/api2/authenticate', function(req, res) {

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

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
});

//end jwt work




app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(flash());

mongoose.connect('mongodb://localhost:27017/kyg');

app.use(passport.initialize());
app.use(require('express-session')({
    secret: 'keyboard cat is cool guy',
    resave: true,
    saveUninitialized: true
}));

// Create endpoint handlers for /users
router.route('/api/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for oauth2 authorize
router.route('/api/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

// Create endpoint handlers for oauth2 token
router.route('/api/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token); 

// Create endpoint handlers for /clients
router.route('/api/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

// Create endpoint handle for /page/
router.route('/api/pages')
  .post(authController.isAuthenticated, pageRoutes.postPage)
  .get(authController.isAuthenticated, pageRoutes.getPages);
// Create endpoint handlers for /pages/:page_id
router.route('/api/pages/:name')
  .get(authController.isAuthenticated, pageRoutes.getPage)
  .put(authController.isAuthenticated, pageRoutes.putPage)
  .delete(authController.isAuthenticated, pageRoutes.deletePage);
//
// Create endpoint for file uploads
//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/build/KnowYourGlass/public/images')
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
app.get('/', function(req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
});
console.log('Listening');
app.listen(8080);
