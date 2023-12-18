const express =require("express")
const mongoose = require("mongoose")
const User = require("../models/User")
const router = express()
router.post("/register", async(req,res)=>{
    try {
        console.log(req.body);
        const {username,email,password}= req.body
        const newUser= new User({
            username:username,
            email:email,
            password:password

        })
      const result = await newUser.save()
      res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }

})
router.post("/login", async(req,res)=>{
    try {
       const {email,password}=req.body 
       console.log(req.body);
     const user = await User.findOne({email:email})
     if(!user){
      return res.status(500).json("user doesnot exist")
     }
     if(password==user.password){
        res.status(200).json(user)
     }else{
        res.status(200).json("password doesnot match")
     }

    
    } catch (e) {
        res.status(500).json(e)
        
    }
})
module.exports = router