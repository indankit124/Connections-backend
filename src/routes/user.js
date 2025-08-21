
const express = require("express");
const userRouter =express.Router();
const userAuth= require ("../middlewares/authentication");
const ConnectionRequestModel= require("../models/connectionRequest");
const userModule = require("../models/user")


userRouter.get("/user/connections",userAuth,async(req,res)=>{
   try {
     const loggedInUserId= req.user._id;
     
     const getingTheAcceptedConnections= await ConnectionRequestModel.find(
         {$or:[{toUserId:loggedInUserId},{fromUserId:loggedInUserId}],
             status:"accepted"
         }
     ).populate("fromUserId", "firstName lastName photoUrl").populate("toUserId", "firstName lastName photoUrl")
     if(getingTheAcceptedConnections.length===0){
         return res.status(200).json({ message: "no accepted connection requests", data: [] });
     }
   data= getingTheAcceptedConnections.map(value=>{if(value.fromUserId.equals(loggedInUserId)){
        return value.toUserId
    }
return value.fromUserId})
     res.status(200).json(data);
   } catch (error) {
     console.error("Error fetching pending requests:", error);
        res.status(500).send("Server error");
   }
})



userRouter.get("/user/requests",userAuth, async (req,res)=>{
 try {
     const loggedInUserId =req.user._id;
     const pendingrequests =await ConnectionRequestModel.find({
        toUserId:loggedInUserId,
        status:"interested"
     }).populate("fromUserId","firstName lastName photoUrl").populate("toUserId", "firstName lastName");
     if(pendingrequests.length===0){
         res.status(404).json({ message: "No pending requests found" });
     }
      res.status(200).json(pendingrequests);
 } catch (err) {
    console.error("Error fetching pending requests:", err);
        res.status(500).send("Server error");   
 }    
})


userRouter.get("/user/feed",userAuth,async(req,res)=>{
   try {
     const loggedInUserId= req.user._id;
     const page=  parseInt(req.query.page)||1; 
     const limit = parseInt(req.query.limit)||10;
     const skip = (page-1)*10;

     if(limit>50){
         limit=50;
        };
        
    const connectionRequest =await ConnectionRequestModel.find({
        $or:[{toUserId:loggedInUserId},{fromUserId:loggedInUserId}]
    }).select("fromUserId toUserId");


    const hideInTheFeed = new Set();
    connectionRequest.forEach((event)=>{hideInTheFeed.add(event.fromUserId.toString());
        hideInTheFeed.add(event.toUserId.toString())
    });
    console.log(hideInTheFeed);
    let users = await userModule.find({
       $and:[ {_id:{$nin:Array.from(hideInTheFeed)}},{_id:{$ne:loggedInUserId}}]
    }).select("firstName lastName gender photoUrl about skills  ").skip(skip).limit(limit)


  res.send(users)
   } catch (error) {
    
   }


})

module.exports= userRouter;