const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    fname:
    {
        type: String,
    },
    lname: {
        type: String,

    },
    phone: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    profilepic: {
        type: String,

    },
    is_varified: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: ''
    }

});


module.exports = mongoose.model("adminTB", admin);




