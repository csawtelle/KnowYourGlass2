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
  res.sendFile('dist/index.html', { root: __dirname });
});
console.log('Listening');
app.listen(8080);
