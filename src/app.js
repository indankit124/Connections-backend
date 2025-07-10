const express = require("express");
const app = express();
app.get("/",(request,respond)=>{
    respond.send("Hello, World!");
});
app.get("/text",(request,respond)=>{
    respond.send("Hello, Text!");
});
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})