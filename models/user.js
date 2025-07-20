const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,},
        lastName:{type:String},
        emailId:{type:String , required:true, unique:true,trim:true,lowercase:true},
        password:{type:String, required:true,minLength:6,maxLength:15},
        age:{type:Number, min :18,max:120},
        gender:{type:String,required:true,validate(value){if(!["male","female","others"]){throw new console.error();
        }}},
        photoUrl:{type:String,default:"https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png"},
        about:{type:String,default:"this is a default about String"},
        skills:{type:String}
},{timestamps:true}
);  

const userModule = mongoose.model("User",userSchema);
module.exports= userModule; 