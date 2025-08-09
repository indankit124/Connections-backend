const express = require("express")
const requestRouter = express.Router();
const userAuth =require("../middlewares/authentication");
const ConnectionRequestModel= require("../models/connectionRequest");
const { status } = require("express/lib/response");
const userModule = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
try {
    const fromUserId=req.user._id;
    // console.log(fromUserId)
    const toUserId= req.params.toUserId;
    const status =req.params.status;


  const doesToUserExists= await userModule.findById(toUserId);
  if(!doesToUserExists){
    return res.status(404).send("user does not exists");
  } 



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

    
    const connectionRequest = new ConnectionRequestModel({fromUserId,toUserId,status});
    const data=await connectionRequest.save()
    //res.send(connectionRequest)
    res.json({message:req.user.firstName+" is "+status+" in "+doesToUserExists.firstName , data})
} 

catch (error) {
    console.error("Validation failed:", error.message);
    res.status(500).send({ error: error.message }) 
}
})




requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const status = req.params.status;
    const requestId = req.params.requestId;

    const ALLOWED_STATUS = ["accepted", "rejected"];
    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).send("Invalid request type");
    }

    // Check if request exists and belongs to the logged-in user
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser,
      status: "interested"
    });

    if (!connectionRequest) {
      return res.status(404).send("Connection request not valid");
    }

    if (status === "rejected") {
      await ConnectionRequestModel.findByIdAndDelete(requestId);
      return res.status(200).send("Request rejected");
    }

    if (status === "accepted") {
      await ConnectionRequestModel.findByIdAndUpdate(requestId, { status: "accepted" });
      return res.status(200).send("Request accepted");
    }

  } catch (error) {
    console.error("Validation failed:", error.message);
    res.status(500).send({ error: error.message });
  }
});

module.exports= requestRouter;