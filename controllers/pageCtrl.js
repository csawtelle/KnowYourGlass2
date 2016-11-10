// Load required packages
var Page = require('../models/page');

exports.postPage = function(req, res) {
  var page = new Page();
    page.date = req.body.date;
    page.name = req.body.name;
    page.brand = req.body.brand;
    page.category = req.body.category;
    page.image = req.body.image;
    page.rating = req.body.rating;
    page.paragraphs = req.body.paragraphs;
    page.pictures = req.body.pictures;
    page.title_image = req.body.title_image;
    page.save(function(err) {
        if(err) {
            res.json({ message: 'Post failed!', data: err});
        }
        else {
            res.json({ message: 'Post added!', data: page });
        }
  });
};

exports.getPages = function(req, res) {
  Page.find({}, function(err, pages) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeeded!', data: pages });
        }
  });
};

exports.getPage = function(req, res) {

  if(req.query.search){
    Page.find({
      name: {
        "$regex": req.params.name,
        "$options": "i"
      }
    }, function(err, page) {
            if(err) {
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                res.json({ message: 'Get succeded!', data: page });
            }
      }).sort('-postDate');
  } else {
    Page.find({name: req.params.name }, function(err, page) {
          if(err) {
              res.json({ message: 'Get failed!', data: err});
          }
          else {
              res.json({ message: 'Get succeded!', data: page });
          }
    }).sort('-postDate');
  }
};

exports.putPage = function(req, res) {
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

exports.deletePage = function(req, res) {
  Page.remove({name: req.params.name }, function(err) {
        if(err) {
            res.json({ message: 'Delete failed!'});
        }
        else {
            res.json({ message: 'Post deleted!'});
        }
  });
};
