const express = require("express")
const profileRouter  = express.Router();
const userModule = require("../models/user.js")
const userAuth = require("../middlewares/authentication.js")
const validateSignUpData = require("../../utils/validation.js")

profileRouter.get ("/profile/view",userAuth, async (req,res)=>{
 try{ //   const token = req.cookies.token;
    
  //    if (!token) return res.status(401).send("Token not found");
  //  var decoded =  jwt.verify(token, 'CONNECTIONdemo123@');
  //   console.log(decoded)

  //  const user= await userModule.find(req.body.emailId) ;
  //    if (!user) {
  //     return res.status(404).send("User not found");
  //   } 
   const user= req.user;
  //  console.log("this is user ",user._id)
    res.send(user);
  }

catch(err){
    console.error("Error fetching profile:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});



profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
 try{ const data= req.body;
  const user= req.user;
  //validateSignUpData(req)
  const ALLOWED_UPDATE= ["firstName","lastName","age","gender","about","skills"];
  const to_update_data =Object.keys(data).every((keys)=>ALLOWED_UPDATE.includes(keys));
  console.log(to_update_data)
  if(!to_update_data){throw new Error("update not allowed")}
  await userModule.findByIdAndUpdate(user._id, data ,{runValidators:true});
res.send("profile is updated")
}
catch(err){
  console.error("Error upadting profile:", err.message);
    res.status(500).send({ "Error":err.message  });
  
}  
})

profileRouter.patch("/profile/changePassword",userAuth,(req,res)=>{
  
  
  
  
  
  
  
  
  
  
  const {token}= req.cookies;
    
if (!token) {
      return res.status(401).send("Access Denied: No token provided.");
    }

 var decoded =  jwt.verify(token, 'CONNECTIONdemo123@');
const{_id}= decoded;

const user = await userModule.findById(_id);
if(!user){throw new Error("user id is not available !!")}
req.user =user;
})

module.exports = profileRouter;

