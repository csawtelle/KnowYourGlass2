/*
<!--
    name: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    pictures: [{type: String, required: true}],
    picture_descriptions: [{type: String, required: true}],
    paragraphs: [{type: String, required: true}],
    date: {type: String, required: true, unique:true},
    rating: {type: String, required: true}
-->
*/

// Load required packages
var Page = require('../models/page');

// Create endpoint /api/beers for POST
exports.postPage = function(req, res) {
  // Create a new instance of the Beer model
  var page = new Page();
  // Set the beer properties that came from the POST data
    page.date = req.body.date;
    page.name = req.body.name;
    page.brand = req.body.brand;
    page.category = req.body.category;
    page.image = req.body.image;
    page.rating = req.body.rating;
    page.paragraphs = req.body.paragraphs;
    page.pictures = req.body.pictures;
    page.title_image = req.body.title_image;
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
            res.json({ message: 'Get succeeded!', data: pages });
        }
  });
};

// Create endpoint /api/page/:page_id for GET
exports.getPage = function(req, res) {
  // Use the Beer model to find a specific page
  Page.find({name: req.params.name }, function(err, page) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeded!', data: page });
        }
  }).sort('-postDate');
};

// Create endpoint /api/pages/:page_id for PUT
exports.putPage = function(req, res) {
  console.log("name*************************************************");
  console.log(req.params);
  console.log("body************************************************");
  console.log(req.body);
  Page.update({name: req.params.name }, { 
    date: req.body.date,
    name: req.body.name,
    brand: req.body.brand,
    category: req.body.category,
    image: req.body.image,
    rating: req.body.rating,
    paragraphs: req.body.paragraphs,
    pictures: req.body.pictures,
    title_image: req.body.title_image

  }, function(err, num, raw) {
    if(err) {
        res.json({ message: 'Update failed!', data: err});
    }
    else {
        Page.find({name: req.body.name }, function(err, page) {
            if(err) {
                res.json({ message: 'Update succeded but GET failed!', data: err});
            }
            else {
                res.json({ message: 'Update succeded!', data: page });
            }
        }).sort('-postDate');
    }
  });
};
// Create endpoint /api/page/:page_id for DELETE
exports.deletePage = function(req, res) {
  // Use the Page model to find a specific page and remove it
  Page.remove({name: req.params.name }, function(err) {
        if(err) {
            res.json({ message: 'Delete failed!'});
        }
        else {
            res.json({ message: 'Post deleted!'});
        }
  });
};
