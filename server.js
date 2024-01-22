const express= require("express")
const cors = require("cors")
const morgan=require("morgan")
const colors= require("colors")
const dotenv=require('dotenv')
const connectDB= require("./config/connectDB")

//env config
dotenv.config();

//router import
const userRoutes=require("./routes/userRoutes")
const blogRoutes=require("./routes/blogRoutes")

//rest object 
const app= express()
//connectDB

connectDB();

//middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);

//LISTEN
const PORT=process.env.PORT

app.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)})
