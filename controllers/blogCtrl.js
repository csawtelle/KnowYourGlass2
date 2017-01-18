const Blog = require('../models/blog');

exports.getBlogs = ((req, res) => {

  Blog.find({}, (err, blogs) => {
  
  if (err) {
    res.status(400).json(err);
    }
    res.json(blogs);
  });  
});

exports.postBlog = ((req,res) => {
  var blog = new Blog(req.body);

  blog.save((err, blog) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(blog);
  });
});

exports.findBlog = ((req, res) => {
  let title = req.params.title;

  Blog.findOne({ title: new RegExp(title, "i") }, (err, blog) => {
    if (err) {
      res.status(400).json(err);
    }
    if (!blog) {
      res.status(404).json({ message: "Blog post not found"});
    }
    res.json(blog);
  });
});

exports.deleteBlog = ((req,res) => {
  let title = req.params.title;
  Blog.findOneAndRemove({ title: new RegExp(title, "i") }, (err, blog) => {
    if(err) {
      res.status(400).json(err);
    }
    if(!blog){
      res.status(404).json({message: "Blog post not found"});
    }
      res.json({ message: "Post deleted"});
  });
});
