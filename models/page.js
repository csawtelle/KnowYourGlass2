// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var PageSchema   = new mongoose.Schema({
    lensName: {type: String, required:true, unique:true},
    lensBrand: {type: String, required: true},
    lensCatagory: {type: String, required: true},
    lensIP: {type: String, required: true},
    ratingIP: {type: String, required: true},
    introSection: {type: String, required: true},
    middleSection: {type: String, required: true},
    endSection: {type: String, required: true},
    left1IP: {type: String, required: true},
    right1IP: {type: String, required: true},
    left2IP: {type: String, required: true},
    right2IP: {type: String, required: true},
    description1L: {type: String, required: true},
    description1R: {type: String, required: true},
    description2L: {type: String, required: true},
    description2R: {type: String, required: true},
    introSummary: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Page', PageSchema);

