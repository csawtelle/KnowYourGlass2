// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var BlogSchema   = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    keywords: {type: String, required: true},
    date: {type: String, required: true},
    title_image: {type: String, required: true},
    content: {type: String, required: true},
    content_summary: {type: String, required: true},
    author: {type: String, required: true},
    likes: {type: Number, required: true}    
});

// Export the Mongoose model
module.exports = mongoose.model('Blog', BlogSchema);

