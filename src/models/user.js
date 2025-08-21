const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,index:true,validate(value){if(value.length<4){throw new Error("name is too short not valid");
        }}},
        lastName:{type:String},
        emailId:{type:String , required:true, unique:true,trim:true,lowercase:true, validate(value){if(!validator.isEmail(value)){throw new Error("enter valid email id ")}}},
        password:{type:String, required:true,minLength:6,maxLength:105,validate(value){if(!validator.isStrongPassword(value)){throw new Error("enter strong password")}}},
        age:{type:Number, min :18,max:120},
        gender:{type:String,required:true,validate(value){if(!["male","female","others"].includes(value.toLowerCase())){throw new Error("invalid error")}
        }},
        photoUrl:{type:String,default:"https://t4.ftcdn.net/jpg/12/60/10/45/360_F_1260104521_e83wrn9qiiPRovfltsD38EEoc38K2eYJ.jpg",validate(value){if(!validator.isURL(value)){throw new Error("invalid photo url")}}},
        about:{type:String,default:""},
        skills:{type:[String],default:[]},
        currentJob:{type:String,default:"not working currently"},
},{timestamps:true}
);  

const userModule = mongoose.model("User",userSchema);
module.exports= userModule; 