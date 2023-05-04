const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const user = new mongoose.Schema({
    fname:
    {
        type: String,
    },
    lname: {
        type: String,
    },
    gender: {
        type: String,
    },
    nationality: {
        type: String,

    },
    dob: {
        type: Date,

    },
    address: {
        type: String,

    },
    profilepic: {
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
    languages: {
        type: String,

    },
    github: {
        type: String,

    },
    linkedin: {
        type: String,

    },
    portfolioweb: {
        type: String,

    },
    institute: {
        type: String,

    },
    yearofjoining: {
        type: String,

    },
    course: {
        type: String,

    },
    skills: {
        type: String,

    },
    companyname: {
        type: String,

    },
    designation: {
        type: String,

    },
    experience: {
        type: Number,

    },
    role: {
        type: String,
        default: "student"
    },
    token: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model("usersTB1", user);




