//Express
var express = require('express');
var cookieParser = require('cookie-parser'); //cookie parser
var bodyParser = require('body-parser');
var router = express.Router();
var cors = require('cors');
var app = express();
app.use(cookieParser()) //cookie parser
app.use(cors())
app.get('/api/cookies', (req, res) => {
  console.log('cookies in the request is: ', req.cookies);
  res.send(req.cookies);
});
//Controllers
var reviewCtrl = require('./controllers/reviewCtrl');
var blogCtrl = require('./controllers/blogCtrl');
var authCtrl = require('./controllers/jwtCtrl');
var mailerCtrl = require('./controllers/mailerCtrl');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/kyg');

//File Upload
var multer = require('multer');

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

//Mailer Code
router.route('/api/mailer')
  .post(mailerCtrl.sendHash);

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
  .get(authCtrl.apiWelcome);
router.route('/api/setup')
  .post(authCtrl.createUser);
router.route('/api/authenticate')
  .post(authCtrl.tokenRequest);
router.route('/api/users')
  .get(authCtrl.jwtCheck, authCtrl.returnUsers);

//Blogs
router.route('/api/blogs')
  .post(authCtrl.jwtCheck, blogCtrl.postBlog);
router.route('/api/blogs/:title')
  .put(authCtrl.jwtCheck, blogCtrl.putBlog)
  .delete(authCtrl.jwtCheck, blogCtrl.deleteBlog);

//Reviews
router.route('/api/reviews')
  .post(authCtrl.jwtCheck, reviewCtrl.postReview);
router.route('/api/reviews/:title')
  .put(authCtrl.jwtCheck, reviewCtrl.putReview)
  .delete(authCtrl.jwtCheck, reviewCtrl.deleteReview);

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
app.listen(8081);
