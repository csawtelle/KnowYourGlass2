var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var ejs = ('ejs');
var session = require('express-session');
var passport = require('passport');
var mainController = require('./controllers/main');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var oauth2Controller = require('./controllers/oauth2');
var clientController = require('./controllers/client');
var routes = require('./routes');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Create endpoint handlers for /clients
router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/homepage.html'));
});

app.get('/admin/:page', function(req, res) {
    var page = req.params.page;
    res.sendFile(path.join(__dirname + '/views/' + page + '.html'));
});

app.get('/reviews/:brand/:lens', function(req, res) {
    var brand = req.params.brand;
    var lens = req.params.lens;
    res.sendFile(path.join(__dirname + '/reviews/' + '/' + brand + '/' + lens + '.html'));
});


app.listen(8080);
