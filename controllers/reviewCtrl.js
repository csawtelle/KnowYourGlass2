// Load required packages
var Review = require('../models/review');

exports.postReview = function(req, res) {
  var review = new Review();
    review.post_date = new Date().toLocaleString().split(',')[0];
    review.edit_date = req.body.edit_date;
    review.sensor = req.body.sensor;
    review.title = req.body.title;
    review.brand = req.body.brand;
    review.category = req.body.category;
    review.rating = req.body.rating;
    review.title_image = req.body.title_image;
    review.content = req.body.content;
    review.author = req.body.author;

    review.save(function(err) {
        if(err) {
            console.log("Post was attempted, post failed");
            res.json({ message: 'Post failed!', data: err});
        }
        else {
            console.log("Post was attempted, post SUCCESS");
            res.json({ message: 'Post added!', data: review });
        }
  });
};

exports.getReviews = function(req, res) {
  if(req.query.search){
    var searchArray = [];
    var textArray = [];
    for (var key in req.query) {
      if(key == "text") {
        var textQuery = {}
        textQuery['content'] = { 
          "$regex": req.query[key],
          "$options": "i"
        };
        textArray.push(textQuery);
        textQuery['title'] = { 
          "$regex": req.query[key],
          "$options": "i"
        };
        textArray.push(textQuery);
      } else {
        if(key != "usertitle" && key != "password" && key != "search" && key != "text") {
          var obj = req.query[key];
          var paramQuery = {}
          paramQuery[key] = { 
            "$regex": obj,
            "$options": "i"
          };
          searchArray.push(paramQuery);
        }
      }
    }
    var query = {};
    query['$and'] = [];
    if(searchArray.length != 0) {
      query['$and'].push({
        '$and': searchArray
      })
    }
    if(textArray.length != 0) {
      query['$and'].push({
        '$or': textArray
      })
    }
    Review.find(query, function(err, review) {
            console.log("Finding a single");
            if(err) {
                console.log("Multiple Review Query FAILED");
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                console.log("Multiple Review Query SUCCEEDED");
                res.json({ message: 'Get succeeded!', data: review });
            }
      }).sort('-postDate');
  } else {
    Review.find({}, function(err, reviews) {
        if(err) {
            console.log("Multiple Review Query FAILED");
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            console.log("Multiple Review Query SUCCEEDED");
            res.json({ message: 'Get succeeded!', data: reviews });
        }
    });
  }
};

exports.getReview = function(req, res) {
  console.log("GET PAGE");
  if(req.query.search){
    var searchArray = [];
    for (var key in req.query) {
      if(key != "usertitle" && key != "password" && key != "search") {
        var obj = req.query[key];
        var query = {}
        query[key] = { 
          "$regex": obj,
          "$options": "i"
        };
        searchArray.push(query);
      }
    }
    Review.find({ '$or': searchArray
      }, function(err, review) {
            if(err) {
                console.log("Single Review requested FAILED");
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                console.log("Single Review request SUCCEEDED");
                res.json({ message: 'Get succeded!', data: review });
            }
      }).sort('-postDate');
  } else {
    Review.find({title: req.params.title }, function(err, review) {
          if(err) {
              console.log("Single Review Request FAILED");
              res.json({ message: 'Get failed!', data: err});
          }
          else {
              console.log("Single Review Request SUCCEEDED");
              res.json({ message: 'Get succeded!', data: review });
          }
    }).sort('-postDate');
  }
};

exports.putReview = function(req, res) {
  Review.update({title: req.params.title }, { 
    post_date: req.body.post_date,
    edit_date: req.body.edit_date,
    sensor: req.body.sensor,
    title: req.body.title,
    brand: req.body.brand,
    category: req.body.category,
    rating: req.body.rating,
    pictures: req.body.pictures,
    title_image: req.body.title_image,
    content: req.body.content,
    author: req.body.author

  }, function(err, num, raw) {
    if(err) {
        res.json({ message: 'Update failed!', data: err});
    }
    else {
        Review.find({title: req.body.title }, function(err, review) {
            if(err) {
                console.log("Review Update succeeded but GET failed");
                res.json({ message: 'Update succeded but GET failed!', data: err});
            }
            else {
                console.log("Review Update SUCCESS");
                res.json({ message: 'Update succeded!', data: review });
            }
        }).sort('-postDate');
    }
  });
};

exports.deleteReview = function(req, res) {
  Review.remove({title: req.params.title }, function(err) {
        if(err) {
            console.log("Review delete failed");
            res.json({ message: 'Delete failed!'});
        }
        else {
            console.log("Review delete success!");
            res.json({ message: 'Post deleted!'});
        }
  });
};
