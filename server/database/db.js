const mongoose = require('mongoose');
require('dotenv').config();
const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected successfully");
    }
    catch(e){
        console.log("MongoDB connection failed");
    }
}

module.exports = connectToDB;