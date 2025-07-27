const express = require("express");

const DBConnect= require("./config/DataBase.js");
const userModule = require("./models/user.js")
const cookieParser= require("cookie-parser")
const userAuth = require("./middlewares/authentication.js")

const authRouter = require('./routes/auth.js');
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js")
const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter,profileRouter,requestRouter )




app.post("/SendConnectionRequest",userAuth,(req,res)=>{
res.send("connection request sent")
})



// app.patch("/user/:userId" ,userAuth,async(req,res)=>{
//     const userId = req.params.userId;
//     const data = req.body;
    
//     try {
//         const ALLOWED_UPDATES = ["firstName", "lastName", "emailId", "password", "age", "gender", "photoUrl", "about", "skills"];
//         const is_update_allowed = Object.keys(data).eyery((keys)=>ALLOWED_UPDATES.include(keys));
//         if (!is_update_allowed) {
//             throw new Error("update not allowed");
//         }
//         const updatedUser = await userModule.findByIdAndUpdate(userId, data, { runValidators: true, returnDocument: "after" });

//         res.send("user is updated");
//     } catch (err) {
//         res.status(404).send(err.message);
//     }
// })

app.get("/allUser", async (req, res) => {
    console.log(req.body);
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

