const mongoose = require("mongoose")
const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to MONGODB Database`)
        
    } catch (error) {
        console.log(`MONGO CONNECT ERROR ${error}") `)
        
    }
}

module.exports=connectDB;