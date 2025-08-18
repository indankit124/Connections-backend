const express = require("express");

const DBConnect= require("./config/DataBase.js");
const userModule = require("./models/user.js")
const cookieParser= require("cookie-parser")
const cors = require("cors");


const authRouter = require('./routes/auth.js');
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter= require("./routes/user.js");

const app = express();
app.use(cors({origin: "http://localhost:5173", credentials: true}));
app.use(express.json())
app.use(cookieParser())

app.use("/",authRouter,profileRouter,requestRouter,userRouter )





DBConnect().then(()=>{console.log("connection to the db");app.listen(3000,()=>{
    console.log("Server is running on port 3000")} )}).catch((err)=>{"Not connected ",err});

