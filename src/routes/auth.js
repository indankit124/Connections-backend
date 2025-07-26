const express = require("express");
const authRouter =express.Router();
const cookieParser= require("cookie-parser")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSignUpData = require("../../utils/validation.js")
const userModule = require("../models/user.js")
 

authRouter.use(express.json())
authRouter.use(cookieParser())


authRouter.post("/signup" ,async(req,res)=>{
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


authRouter.post("/login", async (req, res) => {

  try{console.log(req.body);
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

var token = jwt.sign({ _id: checkingUser._id }, 'CONNECTIONdemo123@', { expiresIn: '1d' });
 res.cookie("token",token)


res.send("Login successful");
}
  catch (err) {
    console.error("Login failed:", err.message);
    res.status(500).send("Internal Server Error");
  }
});


authRouter.post("/logout",(req,res)=>{

    res.clearCookie("token");
    res.send("user has logged out")
})

module.exports= authRouter;