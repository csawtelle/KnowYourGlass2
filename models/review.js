// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var ReviewSchema   = new mongoose.Schema({
    title: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    sensor: {type: String, required: true},
    post_date: {type: String, required: true},
    edit_date: {type: String, required: true},
    rating: {type: String, required: true},
    title_image: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Review', ReviewSchema);

