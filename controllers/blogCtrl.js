const Blog = require('../models/blog');

exports.getBlog = ((req, res) => {
  let title = req.params.title;

  Blog.findOne({ title: new RegExp(title, "i") }, (err, blog) => {
    if (err) {
      res.status(400).json(err);
    } else if (!blog) {
      res.status(404).json({ message: "Blog post not found"});
    } else {
      res.json(blog);
    }
  });
});

exports.getBlogs = ((req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) { res.status(400).json(err); }
    res.json(blogs);
  });  
});

exports.postBlog = ((req,res) => {
  var blog = new Blog(req.body);
  blog.save((err, blog) => {
    if (err) { res.status(400).json(err); }
    res.json(blog);
  });
});

exports.putBlog = function(req, res) {
  Blog.update({title: req.params.title }, { 
    title: req.body.title,
    keywords: req.body.keywords,
    date: req.body.date,
    title_image: req.body.title_image,
    content: req.body.content,
    author: req.body.author

  }, function(err, num, raw) {
    if(err) {
        res.json({ message: 'Update failed!', data: err});
    }
    else {
      Blog.find({title: req.body.title }, function(err, blog) {
          if(err) {
              console.log("Blog Update succeeded but GET failed");
              res.json({ message: 'Update succeded but GET failed!', data: err});
          } else {
              console.log("Blog Update SUCCESS");
              res.json({ message: 'Update succeded!', data: blog });
          }
      }).sort('-postDate');
    }
  });
};

exports.deleteBlog = ((req,res) => {
  let title = req.params.title;
  Blog.findOneAndRemove({ title: title }, (err, blog) => {
    if(err) {
      res.status(400).json(err);
    } else if (!blog) {
      res.status(404).json({message: "Blog post not found"});
    } else {
      res.json({ message: "Post deleted"});
    }
  });
});
