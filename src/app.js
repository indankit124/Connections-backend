const express = require("express");

const DBConnect= require("./config/DataBase.js");
const userModule = require("./models/user.js")
const cookieParser= require("cookie-parser")


const authRouter = require('./routes/auth.js');
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter= require("./routes/user.js");

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter,profileRouter,requestRouter,userRouter )



// app.patch("/user/:user_id",async(req,res)=>{
    
   // const data= req.body;
   // const  userId= req.params.user_id;
   //  try{
   //  const ALLOWED_UPDADTES=["firstName","lastName","password","age","gender","photoUrl","about","skills"];
   //  const is_update_allowed = Object.keys(data).every((k)=>ALLOWED_UPDADTES.includes(k))   ;
   //   if(!is_update_allowed){
   //      throw new Error("update not allowed")
   //   }
   //  const updatedUser = await userModule.findByIdAndUpdate(userId ,data,{runValidators:true,returnDocument:"after"});
   
   //  res.send("user is updated")}
   //  catch(err){res.status(404).send(err.message)}    
   // })



DBConnect().then(()=>{console.log("connection to the db");app.listen(3000,()=>{
    console.log("Server is running on port 3000")} )}).catch((err)=>{"Not connected ",err});

