const express = require("express");
const {AdminAuth,UserAuth}=require("../middlewares/authentication.js")
const DBConnect= require("../config/DataBase.js");
const userModule = require("../models/user.js")
const app = express();
app.use(express.json())
app.post("/signup" ,async(req,res)=>{
// const userObj ={
//     firstName:"Ankit",
//     lastName:"Mahala",
//     emailId:"ankitMsddahala@gmail.com",
//     password:"ankitMahala@1234",
//     age:24,
//     gender:"Male"
// };
// console.log(req.body)
const user = new userModule(req.body);
await user.save();
res.send("user added")
})

DBConnect().then(()=>{console.log("connection to the db");app.listen(3000,()=>{
    console.log("Server is running on port 3000")} )}).catch((err)=>{"Not connected ",err});

