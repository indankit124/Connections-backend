const express = require("express");
const {AdminAuth,UserAuth}=require("../middlewares/authentication.js")
const DBConnect= require("../config/DataBase.js");
const userModule = require("../models/user.js")
const app = express();
app.use(express.json())


app.post("/user" ,async(req,res)=>{
console.log(req.body)
const user = new userModule(req.body);
await user.save();
res.send("user added")
});

//FEED API - get all the users from the api for the feed
app.get("/feed",async(req, res)=>{
console.log(req.body)
const users = await userModule.find(req.body); // Find all users  with a email id 
        // res.status(200).json(users);
        if(users.length>0){
        res.send(users)}
    else{res.send("User not find")

    }}
        // catch{res.send("User not find")}
)






app.get ("/findingUser",async (req,res)=>{
   const alluser= await userModule.find() ;
   res.send(alluser)
})






app.get("/allUser",async(req, res)=>{
console.log(req.body)
const users = await userModule.findOne(req.body); // Find all users  with a email id 
        // res.status(200).json(users);
        if(users==null){
        res.send("User not find")}
    else{res.send(users)
  
    }}
        // catch{res.send("User not find")}
)






app.patch("/user/:user_id",async(req,res)=>{
    
   const data= req.body;
   const  userId= req.params.user_id;
    try{
    const ALLOWED_UPDADTES=["firstName","lastName","password","age","gender","photoUrl","about","skills"];
    const is_update_allowed = Object.keys(data).every((k)=>ALLOWED_UPDADTES.includes(k))   ;
     if(!is_update_allowed){
        throw new Error("update not allowed")
     }
    const updatedUser = await userModule.findByIdAndUpdate(userId ,data,{runValidators:true,returnDocument:"after"});
   
    res.send("user is updated")}
    catch(err){res.status(404).send(err.message)}
   
    
})
DBConnect().then(()=>{console.log("connection to the db");app.listen(3000,()=>{
    console.log("Server is running on port 3000")} )}).catch((err)=>{"Not connected ",err});

