const express =require("express")
const mongoose = require("mongoose")
const User = require("../models/User")
const { route } = require("./auth")
const router = express()
router.post("/user/edit",async(req,res)=>{
   try {
    const user = await User.findOneAndUpdate({email:req.body.email},{$set:req.body},{new:true})
    res.status(200).json(user)
   } catch (error) {
    res.status(500).json(error)
   }

})
router.post("/user/delete",async(req,res)=>{
    try {
    await User.findOneAndDelete({email:req.body.email})
     res.status(200).json("user has been deleted")
    } catch (error) {
     res.status(500).json(error)
    }
 
 })
 router.get("/user/get",async(req,res)=>{
    try {
        console.log(req.query.email);
      const user = await User.findOne({email:req.query.email})
      res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
 })

module.exports= router