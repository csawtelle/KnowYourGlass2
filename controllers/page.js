// Load required packages
var Page = require('../models/page');

// Create endpoint /api/beers for POST
exports.postPage = function(req, res) {
  // Create a new instance of the Beer model
  var page = new Page();
  // Set the beer properties that came from the POST data
	page.lensName = req.body.lensName;
    page.lensBrand = req.body.lensBrand;
    page.lensCatagory = req.body.lensCatagory;
    page.lensIP = req.body.lensIP;
    page.ratingIP = req.body.ratingIP;
    page.introSummary = req.body.introSummary;
    page.introSection = req.body.introSection;
    page.middleSection = req.body.middleSection;
    page.endSection = req.body.endSection;
    page.left1IP = req.body.left1IP;
    page.right1IP = req.body.right1IP;
    page.left2IP = req.body.left2IP;
    page.right2IP = req.body.right2IP;
    page.description1L = req.body.description1L;
    page.description1R = req.body.description1R;
    page.description2L = req.body.description2L;
    page.description2R = req.body.description2R;
    // Save the beer and check for errors
    page.save(function(err) {
        if(err) {
            res.json({ message: 'Post failed!', data: err});
        }
        else {
            res.json({ message: 'Post added!', data: page });
        }
  });
};

// Create endpoint /api/pages for GET
exports.getPages = function(req, res) {
  // Use the Page model to find all pages
  Page.find({}, function(err, pages) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeded!', data: pages });
        }
  });
};

// Create endpoint /api/page/:page_id for GET
exports.getPage = function(req, res) {
  // Use the Beer model to find a specific page
  Page.find({lensName: req.params.name }, function(err, page) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeded!', data: page });
        }
  });
};

// Create endpoint /api/page/:page_id for DELETE
exports.deletePage = function(req, res) {
  // Use the Page model to find a specific page and remove it
  Page.remove({lensName: req.params.name }, function(err) {
        if(err) {
            res.json({ message: 'Delete failed!'});
        }
        else {
            res.json({ message: 'Post deleted!'});
        }
  });
};
