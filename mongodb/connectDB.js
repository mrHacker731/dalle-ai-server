const mongoose = require("mongoose");

module.exports = async()=>{
    mongoose.set('strictQuery',true);
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error);
    }
    
}
//h7ZgjKFvtwRvqevh