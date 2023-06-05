const mongoose = require("mongoose");

const notification = new mongoose.Schema({
    userid: {
        type: String,
    },
    senderid: {
        type: String
    },
    senderimage: {
        type: String
    },
    msg: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model("NotificationTB", notification);




