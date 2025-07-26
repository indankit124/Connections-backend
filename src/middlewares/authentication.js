const jwt = require('jsonwebtoken');

const  userModule = require("../models/user");

const userAuth =async (req,res,next)=>{
try{    const {token}= req.cookies;
    
if (!token) {
      return res.status(401).send("Access Denied: No token provided.");
    }

 var decoded =  jwt.verify(token, 'CONNECTIONdemo123@');
const{_id}= decoded;

const user = await userModule.findById(_id);
if(!user){throw new Error("user id is not available !!")}
req.user =user;
next()
}catch(err){res.status(401).send("Authentication Error:"+ err.message)}
};


module.exports = userAuth;
