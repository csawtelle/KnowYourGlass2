// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ReviewSchema   = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    sensor: {type: String, required: true},
    post_date: {type: Date, required: true},
    edit_date: {type: Date, required: true},
    rating: {type: String, required: true},
    title_image: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    content_summary: {type: String, required: true},
    likes: {type: Number, required: true}
 
});

// Export the Mongoose model
module.exports = mongoose.model('Review', ReviewSchema);

