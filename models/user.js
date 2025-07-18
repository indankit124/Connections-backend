const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,},
        lastName:{type:String},
        emailId:{type:String , required:true, unique:true},
        password:{type:String, required:true},
        age:{type:Number, min :18,max:120},
        gender:{type:String,required:true}
}
);  

const userModule = mongoose.model("User",userSchema);
module.exports= userModule; 