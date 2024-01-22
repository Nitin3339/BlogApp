const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"]
    },
    email:{
        type:String,
        required:[true,"Enter your Email"]
    },
    password:{
        type:String,
        required:[true,"Enter your Password"]
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
    }]
},{timestamps:true})

const userModel=mongoose.model("User",userSchema)
module.exports=userModel;