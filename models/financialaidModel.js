const mongoose=require("mongoose");

const financialaid= new mongoose.Schema({
    name:{
        type:String,
    },
    image:{
        type: String,
    },
    aid:{
        type: String,
    },
    claimed:{
        type: String,
    },
    description:{
        type:String,
    }
});

module.exports= mongoose.model("FinancialAidTB", financialaid);