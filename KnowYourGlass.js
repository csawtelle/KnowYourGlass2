//Express
var express = require('express');
var cookieParser = require('cookie-parser'); //cookie parser
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
app.use(cookieParser()) //cookie parser
app.get('/api/cookies', (req, res) => {
  console.log('cookies in the request is: ', req.cookies);
  res.send(req.cookies);
});
//Controllers
var reviewCtrl = require('./controllers/reviewCtrl');
var blogCtrl = require('./controllers/blogCtrl');
var jwtAuth = require('./controllers/jwtCtrl');
//Models
var User = require('./models/jwtuser');
var Review = require('./models/review');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kyg');

//File Upload
var multer = require('multer');

//jwt work
var jwt = require('jsonwebtoken');
app.set('superSecret','keyboardcatiscool');

//File Upload Code
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));
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
    limits: { 
      fileSize: 1000000000 
    }
});

//Routes
router.route('/api/reviews')
  .get(reviewCtrl.getReviews);
router.route('/api/reviews/:title')
  .get(reviewCtrl.getReview);

// Route for Blogs
router.route('/api/blogs')
  .get(blogCtrl.getBlogs);
router.route('/api/blogs/:title')
  .get(blogCtrl.getBlog);

//Protected Routes
router.route('/api')
  .get(jwtAuth.apiWelcome);
router.route('/api/setup')
  .post(jwtAuth.createUser);
router.route('/api/authenticate')
  .post(jwtAuth.tokenRequest);
router.route('/api/users')
  .get(jwtAuth.jwtCheck, jwtAuth.returnUsers);
//Blogs
router.route('/api/blogs/:title')
  .delete(jwtAuth.jwtCheck, blogCtrl.deleteBlog);
router.route('/api/blogs')
  .post(jwtAuth.jwtCheck, blogCtrl.postBlog);
router.route('/api/reviews')
  .post(jwtAuth.jwtCheck, reviewCtrl.postReview);
router.route('/api/reviews/:title')
  .put(jwtAuth.jwtCheck, reviewCtrl.putReview)
  .delete(jwtAuth.jwtCheck, reviewCtrl.deleteReview);

//TODO -- integrate this with the rest of the protected routes somehow since its unprotected now
app.post('/api/upload', upload.any(), function(req, res) {
    res.sendStatus(200);
});

//Angular2
app.use(router);
app.get('*', function(req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
});

console.log('Listening - KYG Server has been started');
app.listen(8080);
