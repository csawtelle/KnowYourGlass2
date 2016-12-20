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
var jwtAuth = require('./controllers/jwtCtrl');
var app = express();

//jwt work
var jwt    = require('jsonwebtoken');
var User   = require('./models/jwtuser');
var Page   = require('./models/page');
app.set('superSecret','keyboardcatiscool');
router.route('/api/setup').post(jwtAuth.createUser);
router.route('/api/authenticate')
  .post(jwtAuth.tokenRequest);
router.route('/api/pages')
  .get(pageRoutes.getPages);
router.route('/api/pages/:name')
  .get(pageRoutes.getPage);

//jwtTokenCheck
//router.use(jwtAuth.jwtAuthCheck);
//routes for jwt auth
router.route('/api')
  .get(jwtAuth.apiWelcome);
router.route('/api/users')
  .get(jwtAuth.jwtAuthCheck, jwtAuth.returnUsers);
//end jwt auth

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
  .post(jwtAuth.jwtAuthCheck, pageRoutes.postPage);
// Create endpoint handlers for /pages/:page_id
router.route('/api/pages/:name')
  .put(jwtAuth.jwtAuthCheck, pageRoutes.putPage)
  .delete(jwtAuth.jwtAuthCheck, pageRoutes.deletePage);
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
});
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
