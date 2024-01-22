const express=require("express")
const { getAllBlogsController, createBlogsController, updateBlogsController, getBlogByIdController, deletBlogByIdController, userBlogController } = require("../controllers/blogController")

//router Object
const router=express.Router()

//routes

//GET || all blogs
router.get("/all-blog",getAllBlogsController)

//POST || create blog
router.post("/create-blog",createBlogsController)
//PUT || update blog
router.put("/update-blog/:id",updateBlogsController)
//GET || single blog details
router.get("/get-blog/:id",getBlogByIdController)
//DELETE || delete blog
router.delete("/delete-blog/:id",deletBlogByIdController)

//GET || User Blog
router.get("/user-blg/:id",userBlogController)

module.exports=router