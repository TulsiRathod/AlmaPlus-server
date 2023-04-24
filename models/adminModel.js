const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    fname:
    {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: true
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




