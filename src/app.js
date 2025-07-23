const express = require("express");
const {AdminAuth,UserAuth}=require("../middlewares/authentication.js")
const DBConnect= require("../config/DataBase.js");
const userModule = require("../models/user.js")
const validateSignUpData = require("../utils/validation.js")
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json())


app.post("/signup" ,async(req,res)=>{
console.log(req.body)
try{
    validateSignUpData(req);
    
    
    
  let {firstName ,lastName,emailId,password,gender} = req.body;
   
  
  const saltRounds = 10;
     const myPlaintextPassword = password;
     const passwordHash = await bcrypt.hash(myPlaintextPassword, saltRounds);
        // Store hash in your password DB.    
        console.log("Hash password:" ,passwordHash)

       password = passwordHash;
    
    // Store hash in your password DB.


  //creating a new instance of userModule with the data from the request body
// and saving it to the database  
    const user = new userModule({firstName ,lastName,emailId,password,gender});
await user.save();
res.send("user added")}
 catch (err) {
    console.error("Validation failed:", err.message);
    res.status(404).send({ error: err.message })
}});







app.post("/login", async (req, res) => {
  console.log(req.body);
  const {emailId,password}= req.body;
  const checkingUser = await userModule.findOne({emailId:req.body.emailId});
  console.log(checkingUser)
  if(!checkingUser){
    res.send("user not register ")
  } 
 
  const isPasswordCorrect = await bcrypt.compare(password, checkingUser.password);
   // res.send("got crerdential- user logged in  ");
  // console.log(isPasswordCorrect)
    
if (!isPasswordCorrect) {
  return res.status(401).send("Invalid password");
}

res.send("Login successful");
})








app.get("/feed",async(req, res)=>{
console.log(req.body)
const users = await userModule.find(req.body); 
   
        if(users.length>0){
        res.send(users)}
    else{res.send("User not find")

    }}
    
)






app.get ("/findingUser",async (req,res)=>{
   const alluser= await userModule.find() ;
   res.send(alluser)
})






app.get("/allUser",async(req, res)=>{
console.log(req.body)
const users = await userModule.findOne(req.body); 
        
        if(users==null){
        res.send("User not find")}
    else{res.send(users)
  
    }}
       
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

