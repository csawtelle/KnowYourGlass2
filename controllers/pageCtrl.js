/*
export class Review {
  brand: string;
  category: string;
  date: string;
  name: string;
  rating: string;
}
*/
// Load required packages
var Page = require('../models/page');

exports.postPage = function(req, res) {
  var page = new Page();
    page.date = req.body.date;
    page.sensor = req.body.sensor;
    page.name = req.body.name;
    page.brand = req.body.brand;
    page.category = req.body.category;
    page.image = req.body.image;
    page.rating = req.body.rating;
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
  if(req.query.search){
    var searchArray = [];
    var textArray = [];
    for (var key in req.query) {
      if(key == "text") {
        var textQuery = {}
        textQuery['paragraphs'] = { 
          "$regex": req.query[key],
          "$options": "i"
        };
        textArray.push(textQuery);
        textQuery['name'] = { 
          "$regex": req.query[key],
          "$options": "i"
        };
        textArray.push(textQuery);
      } else {
        if(key != "username" && key != "password" && key != "search" && key != "text") {
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
    console.log(query);
    Page.find(query, function(err, page) {
            if(err) {
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                res.json({ message: 'Get succeeded!', data: page });
            }
      }).sort('-postDate');
  } else {
    Page.find({}, function(err, pages) {
        if(err) {
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            res.json({ message: 'Get succeeded!', data: pages });
        }
    });
  }
};

exports.getPage = function(req, res) {
  if(req.query.search){
    var searchArray = [];
    for (var key in req.query) {
      if(key != "username" && key != "password" && key != "search") {
        var obj = req.query[key];
        var query = {}
        query[key] = { 
          "$regex": obj,
          "$options": "i"
        };
        searchArray.push(query);
      }
    }
    Page.find({ '$or': searchArray
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
    sensor: req.body.sensor,
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
