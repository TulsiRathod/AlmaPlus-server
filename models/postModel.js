const mongoose = require("mongoose");

const post = new mongoose.Schema({
    userid: {
        type: String,
        // required: true
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    designation: {
        type: String,
    },
    companyname: {
        type: String,
    },
    profilepic: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    photos: {
        type: Array
    },
    likes: {
        type: Array,
        default: []
    },
    // comments: {
    //     type: Array,
    //     default: []
    // }
});


module.exports = mongoose.model("PostTB", post);




