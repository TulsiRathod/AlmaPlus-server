const mongoose = require("mongoose");

const event = new mongoose.Schema({
    organizerid: {
        type: String
    },
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    venue: {
        type: String,
    },
    photos: {
        type: Array
    }
});


module.exports = mongoose.model("EventTB", event);




