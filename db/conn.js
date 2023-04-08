//require('dotenv').config();
const mongoose = require("mongoose");


const connectToMongo = async () => {
    try {
        await mongoose.connect("mongodb+srv://drashtidankhara7:drashtidankhara7@cluster0.jcwxk8q.mongodb.net/AlmaPlus?retryWrites=true&w=majority");
        console.log("Connected To AlmaPlus !!!");
    } catch (error) {
        console.log("Error in connection : ", error);
    }
}


module.exports = connectToMongo;
// mongoose.connect(process.env.MONGODB_URL).then(() => {
//     console.log("Connected to AlmaPlus..!");
// }).catch((err) => {
//     console.log("Error :- " + err);
// })
