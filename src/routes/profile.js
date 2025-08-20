const express = require("express")
const profileRouter  = express.Router();
const userModule = require("../models/user.js")
const userAuth = require("../middlewares/authentication.js")

const {validatePasswordChange}= require("../../utils/validation.js")
const bcrypt = require("bcrypt");

profileRouter.get ("/profile/view",userAuth, async (req,res)=>{
 try{ 
   const user= req.user;

    res.send(user);
  }

catch(err){
    console.error("Error fetching profile:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const data = req.body;
    const user = req.user;

    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "age",
      "gender",
      "about",
      "skills",
      "photoUrl",
      "currentJob",
    ];

    const isAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATE.includes(key)
    );
    if (!isAllowed) {
      throw new Error("Update not allowed");
    }

    // return updated document
    const updatedUser = await userModule.findByIdAndUpdate(
      user._id,
      data,
      { new: true, runValidators: true }
    );

    res.json(updatedUser); // ✅ send back full updated user
  } catch (err) {
    console.error("Error updating profile:", err.message);
    res.status(500).send({ error: err.message });
  }
});



profileRouter.patch("/profile/changePassword",userAuth,async(req,res)=>{
 try {const user=req.user;
  console.log(user)
  let{oldPassword,newPassword}= req.body;
  validatePasswordChange(newPassword);
  if(!oldPassword||!newPassword){
   return  res.send("you need to provide both old and new passwords")
  }
 const checkingOldPassword= await bcrypt.compare(oldPassword, user.password );
 if(!checkingOldPassword){
 return  res.send("oldPassword is not correct")
 }

//  validateNewPassword(newPassword)

 const newPasswordHash = await bcrypt.hash(newPassword, 10 )
 await userModule.findByIdAndUpdate(user._id, { password:newPasswordHash },{runValidators:true});
 res.clearCookie("token");
 res.send("password is changed  & user has logged out ")
 console.log("password is changed")
 
   
}
catch (err) {
        console.error("Error changing password:", err);
        res.status(500).send({ "error":err.message });
    }})

module.exports = profileRouter;

