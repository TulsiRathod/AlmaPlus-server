const mongoose = require("mongoose");

const post = new mongoose.Schema({
    userid: {
        type: String,
        // required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    photos: {
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Array,
        default: ''
    }
});


module.exports = mongoose.model("PostTB", post);




