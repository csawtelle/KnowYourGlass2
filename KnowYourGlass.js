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

app.set('env', 'development');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));
app.use(flash());

mongoose.connect('mongodb://localhost:27017/kyg');

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send({ user : req.user.username, password : req.user.hash })
});
//  NOTE: Uncomment the designated section and follow the instructions
//  make a POST request to knowyourglass.com/api/register 

//  header : content-type: application/json
//  body   : { "username":"youruser", "password":"yourpassword"}

//uncomment the below section and restart server to create a new user
/********************************************************************

router.post('/api/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

********************************************************************/
//uncomment the above section and restart server to create a new user



// Create endpoint handle for /page/
router.route('/api/pages')
  .post(passport.authenticate('local'), pageRoutes.postPage)
  .get(pageRoutes.getPages);
// Create endpoint handlers for /pages/:page_id
router.route('/api/pages/:name')
  .get(pageRoutes.getPage)
  .put(passport.authenticate('local'), pageRoutes.putPage)
  .delete(passport.authenticate('local'), pageRoutes.deletePage);
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
app.get('*', function(req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
});
console.log('Listening');
app.listen(8080);
