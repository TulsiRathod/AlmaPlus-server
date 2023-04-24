const mongoose = require("mongoose");

const connectToMongo = async () => {
    try {
        // mongodb+srv://drashtidankhara7:<password>@cluster0.jcwxk8q.mongodb.net/test
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connected To AlmaPlus !!!");
    } catch (error) {
        console.log("Error in connection : ", error);
    }
}

module.exports = connectToMongo;