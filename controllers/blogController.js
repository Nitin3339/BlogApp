const { default: mongoose } = require("mongoose");
const blogModel=require("../models/blogModel");
const userModel = require("../models/userModel");

// GET ALL BLOGS
exports.getAllBlogsController=async(req,res)=>{
    try {
        const blogs=await blogModel.find({}).populate('user');
        if(!blogs){
            return res.status(400).send({
                message:"No blog Found",
                success:false })}
                return res.status(200).send({
                    message:"All Blogs Lists",
                    blogCount:blogs.length,
                    success:true,
                    blogs,
                })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something went wrong in getAllBlogsController",
            success:false,
        })
    }
}
//CREATE BLOG
exports.createBlogsController=async(req,res)=>{
    try {
        const {title,description,image,user}=req.body;
        if(!title || !description || !image || !user){
            return res.status(400).send({
                message:"Incomplete details",
                success:false,
            })
        }
        const existingUser= await userModel.findById(user)
        if(!existingUser){
            return res.status(401).send({
                message:"User Not found",
                success:false,
                
            })
        }
        const newBlog= new blogModel({title,description,image,user})
        const session=await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session})
         existingUser.blogs.push({newBlog})
         await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(200).send({
            message:"Blog Created Successfully",
            success:true,
            newBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error while creating  blog",
            success:false,
        })
    }
}
//UPDATE BLOG
exports.updateBlogsController=async(req,res)=>{
    try {
        const {id}=req.params;
        const{title,description,image}=req.body;
        const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            message:"Blog Updated Successfully",
            success:true,
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message:"Error while updating Blog",
            success:false,
        })
    }
}
//SINGLE BLOG
exports.getBlogByIdController=async(req,res)=>{
    try {
        const {id}=req.params;
        const blog= await blogModel.findById(id)
        if(!blog){
            return res.status(400).send({
                message:"No blog Found ",
                success:false,
            })
        }
        return res.status(200).send({
            message:"Blog Found",
            success:true,
            blog,
        }) 
    } catch (error) {
        return res.status(400).send({
            message:"Error in fetching Blog",
            success:false,
        })
    }
}
//DELETE BLOG
exports.deletBlogByIdController=async(req,res)=>{
    try {
        const {id}=req.params
        const blog= await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save();
        if(!blog){
            return res.status(400).send({
                message:"No Blog Found To Delete",
                success:false })
            
        }
        return res.status(200).send({
            message:"Blog Deleted Successfully",
            success:true,
            blog
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something Went Wrong",
            success:false,
            error,
        })
    }
}

// GET User Blog By ID
exports.userBlogController=async(req,res)=>{
    try {
        const userBlog= await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(400).send({
                message:"Blog Not Found With this ID",
                success:false
            })
        }
        return res.status(200).send({
            message:"Blog Found",
            success:true,
            userBlog,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Error In Finding Blog",
            success:false
        })
        
    }
}