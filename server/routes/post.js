const express =require("express")
const mongoose = require("mongoose")
const User = require("../models/User")
const { route } = require("./auth")
const Post = require("../models/Post")
const router = express()
router.post("/post/create", async (req,res)=>{
    try {
        const {title,description,photo,username,email}= req.body
        const newPost = new Post({
            title:title,
            description:description,
            photo:photo,
            username:username,
            email:email
        })
        const result = await newPost.save()
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
   
})
router.post("/post/edit", async (req,res)=>{
    try {
        const result = await Post.findByIdAndUpdate(req.body.id,{$set:req.body},{new:true})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.post("/post/delete", async (req,res)=>{
    try {
       await Post.findByIdAndDelete(req.body.id)
        res.status(200).json("post has been deleted")
    } catch (error) {
        res.status(500).json(error)
        
    }
})
router.get("/post/get", async (req,res)=>{
    try {
        console.log(req.query);
        const result = await Post.findById(req.query.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/post", async (req,res)=>{
    try {
        console.log("hello");
            var result = await Post.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=router
