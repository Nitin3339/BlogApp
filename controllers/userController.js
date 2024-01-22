const userModel = require("../models/userModel");
const bcrypt= require("bcrypt")
  // register user
  exports.registerController = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Validation
      if (!username || !email || !password) {
        return res.status(400).send({
          message: "Please provide complete details",
          success: false,
        });
      }
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(401).send({
          message: "User Already Exists",
          success: false,
        });
      }
      const hashedPassword= await bcrypt.hash(password,10)
      const newUser = new userModel({ username, email, password:hashedPassword });
      await newUser.save();
      return res.status(201).send({
        message: "User registered successfully",
        success: true,
        newUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error in Register callback",
        success: false,
        error,
      });
    }
  };

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const user= await userModel.find({})
        return res.status(200).send({
            message:"Successfully get all user",
            success:true,
            user,
            usercount:user.length,

        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error in getting All User",
            success:false,

        })
        
    }
    
  };
  // login
  exports.loginController = async (req, res) => {
  try {
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).send({
            message:"Please provide Complete Details",
            success:false,    
        })
   }
    const user= await userModel.findOne({email})
    if(!user){
        return res.status(401).send({
            message:"User does not exist",
            success:false,
    })
    }
    const isMatch= await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).send({
            message:"Incorrect Password",
            success:false,
        })    
    }
    return res.status(200).send({
        message:"User Login Successfull",
        success:true,
        user,
    })
  } catch (error) {
    console.log(error)
    return res.staus(500).send({
        message:"Error in login Callback",
        success:false,
        error
    })
    
  }
  };
  