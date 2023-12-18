const express =require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const auth = require("./routes/auth")
const user = require("./routes/user")
const post = require("./routes/post")
const multer  = require('multer')
const path = require('path')
const cors = require("cors")
const exp = require("constants")
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(auth)
app.use(user)
app.use(post)
app.use("/images",express.static(path.join(__dirname,"/images")))

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("mongodb connected");
}).catch((e)=>{
    console.log(e);
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, req.body.name)
    }
  })
  
  const upload = multer({ storage: storage })
  app.post("/upload",upload.single('file'), (req,res)=>{
    res.status(200).json("file has been uploded")
  })
app.get("/",(req,res)=>{
    res.send("success")
})
app.listen("8000",()=>{
    console.log("app is running");
})