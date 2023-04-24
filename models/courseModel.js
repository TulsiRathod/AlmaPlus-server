const mongoose = require("mongoose");

const course = new mongoose.Schema({
    name: {
        type: String,
    },
    stream: {
        type: String,
    },
    duration: {
        type: Number,
    }
});

module.exports = mongoose.model("courseTB", course);




