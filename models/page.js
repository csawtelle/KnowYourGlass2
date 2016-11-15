// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PageSchema   = new mongoose.Schema({
    name: {type: String, required:true, unique:true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    sensor: {type: String, required: true},
    pictures: [{
      filename: {type: String, required: true},
      description: {type: String, required: true}
    }],
    paragraphs: [{type: String, required: true}],
    date: {type: String, required: true},
    rating: {type: String, required: true},
    title_image: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Page', PageSchema);

