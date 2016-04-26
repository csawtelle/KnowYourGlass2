var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var pageController = require('./controllers/page');



var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




mongoose.connect('mongodb://localhost:27017/kyg');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());









app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.send({ user : req.user.username, password : req.user.hash })
});

router.post('/api/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.route('/api/pages')
  .post(passport.authenticate('local'), pageController.postPage)
  .get(pageController.getPages);

// Create endpoint handlers for /pages/:page_id
router.route('/api/pages/:name')
  .get(pageController.getPage)
  .delete(passport.authenticate('local'), pageController.deletePage);

app.use(router);

//angular part of the web page
app.get('/', function(req, res) {
	res.sendFile('/index.html');
});

app.listen(8080);
