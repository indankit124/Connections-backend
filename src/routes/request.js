const express = require("express")
const requestRouter = express.Router();
const userAuth =require("../middlewares/authentication");
const ConnectionRequestModel= require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try {
    const fromUserId=req.user._id;
    // console.log(fromUserId)
    const toUserId= req.params.toUserId;
    const status =req.params.status;

    if(fromUserId.toString() === toUserId.toString()){
        return res.send("you cannot send request to your self ")
    }
    
    const ALLOWED_STATUS=["ignored","interested"]
    if(!ALLOWED_STATUS.includes(status)){
        return res.status(400).send("invalid request type")
    }


    const alreadySentRequest =await ConnectionRequestModel.findOne({
        fromUserId,toUserId
    })
    if(alreadySentRequest){
       return res.status(409).send("connection request is already been sent");
    }

   const existingConnectionRequest = await ConnectionRequestModel.findOne({
    toUserId:req.user,
     fromUserId:req.params.toUserId
   })
   if(existingConnectionRequest){
      return  res.send("connection request is already pending");
    }

    const sendingRequesToOurself= await ConnectionRequestModel.fin
    const connectionRequest = new ConnectionRequestModel({fromUserId,toUserId,status});
    const data=await connectionRequest.save()
    //res.send(connectionRequest)
    res.json({message:"connection request sent",data})
} catch (error) {
    console.error("Validation failed:", error.message);
    res.status(500).send({ error: err.message }) 
}
})


module.exports= requestRouter;