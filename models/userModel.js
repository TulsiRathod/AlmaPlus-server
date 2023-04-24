const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const user = new mongoose.Schema({
    fname:
    {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    profilepic: {
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
    languages: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    portfolioweb: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true
    },
    yearofjoining: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    role: {
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
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]

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




