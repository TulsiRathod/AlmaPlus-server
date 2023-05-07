const mongoose = require("mongoose");

const education = new mongoose.Schema({
    userid: {
        type: String
    },
    institutename: {
        type: String
    },
    course: {
        type: String
    },
    joinyear: {
        type: Date
    },
    endyear: {
        type: Date
    },
    collagelogo: {
        type: String
    }
});


module.exports = mongoose.model("educationTB", education);




