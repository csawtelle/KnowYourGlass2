// Load required packages
var Blog = require('../models/blog');

exports.postBlog = function(req, res) {
  var blog = new Blog();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.keywords = req.body.keywords;
    blog.title_image = req.body.title_image;
    blog.content = req.body.content;

    blog.save(function(err) {
        if(err) {
            console.log("Post was attempted, post failed");
            res.json({ message: 'Post failed!', data: err});
        }
        else {
            console.log("Post was attempted, post SUCCESS");
            res.json({ message: 'Post added!', data: blog });
        }
  });
};

exports.getBlogs = function(req, res) {
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
    Blog.find(query, function(err, blog) {
            console.log("Finding a single");
            if(err) {
                console.log("Multiple Blog Query FAILED");
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                console.log("Multiple Blog Query SUCCEEDED");
                res.json({ message: 'Get succeeded!', data: blog });
            }
      }).sort('-postDate');
  } else {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("Multiple Blog Query FAILED");
            res.json({ message: 'Get failed!', data: err});
        }
        else {
            console.log("Multiple Blog Query SUCCEEDED");
            res.json({ message: 'Get succeeded!', data: blogs });
        }
    });
  }
};

exports.getBlog = function(req, res) {
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
    Blog.find({ '$or': searchArray
      }, function(err, blog) {
            if(err) {
                console.log("Single Blog requested FAILED");
                res.json({ message: 'Get failed!', data: err});
            }
            else {
                console.log("Single Blog request SUCCEEDED");
                res.json({ message: 'Get succeded!', data: blog });
            }
      }).sort('-postDate');
  } else {
    Blog.find({title: req.params.title }, function(err, blog) {
          if(err) {
              console.log("Single Blog Request FAILED");
              res.json({ message: 'Get failed!', data: err});
          }
          else {
              console.log("Single Blog Request SUCCEEDED");
              res.json({ message: 'Get succeded!', data: blog });
          }
    }).sort('-postDate');
  }
};

exports.putBlog = function(req, res) {
  Blog.update({title: req.params.title }, { 
    date: req.body.date,
    title: req.body.title,
    keywords: req.body.keywords,
    title_image: req.body.title_image,
    content: req.body.content

  }, function(err, num, raw) {
    if(err) {
        res.json({ message: 'Update failed!', data: err});
    }
    else {
        Blog.find({title: req.body.title }, function(err, blog) {
            if(err) {
                console.log("Blog Update succeeded but GET failed");
                res.json({ message: 'Update succeded but GET failed!', data: err});
            }
            else {
                console.log("Blog Update SUCCESS");
                res.json({ message: 'Update succeded!', data: blog });
            }
        }).sort('-postDate');
    }
  });
};

exports.deleteBlog = function(req, res) {
  Blog.remove({title: req.params.title }, function(err) {
        if(err) {
            console.log("Blog delete failed");
            res.json({ message: 'Delete failed!'});
        }
        else {
            console.log("Blog delete success!");
            res.json({ message: 'Post deleted!'});
        }
  });
};
