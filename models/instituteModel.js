const mongoose = require("mongoose");

const institute = new mongoose.Schema({
    name: {
        type: String,
    },
    address: [{
        area: String,
        city: String,
        state: String,
        country: String
    }],
    phone: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    website: {
        type: String
    },
    image: {
        type: String
    },
    active: {
        type: Boolean
    }
});


module.exports = mongoose.model("InstituteTB1", institute);




