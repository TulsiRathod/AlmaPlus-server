const mongoose = require("mongoose");

const notification = new mongoose.Schema({
    userid: {
        type: String,
    },
    senderid: {
        type: String
    },
    image: {
        type: String
    },
    msg: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    title:{
        type:String
    }
});


module.exports = mongoose.model("NotificationTB", notification);




