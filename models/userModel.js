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

//method-2 for generate jwt token
// user.methods.createtoken = async function () {
//     try {
//         // const token = await jwt.sign({ _id: this._id.toString() }, config.secret_jwt);
//         const token = await jwt.sign({ _id: this._id.toString() }, process.env.secret_jwt);
//         this.tokens = this.tokens.concat({ token: token })
//         // console.log(token);
//         await this.save();
//         return token;

//     } catch (error) {
//         res.status(400).send("Error in create token : " + error.message);
//         console.log("Error in create token : " + error.message);
//     }
// }

module.exports = mongoose.model("usersTB1", user);




