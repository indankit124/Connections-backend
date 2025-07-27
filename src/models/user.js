const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,validate(value){if(value.length<4){throw new Error("name is too short not valid");
        }}},
        lastName:{type:String},
        emailId:{type:String , required:true, unique:true,trim:true,lowercase:true, validate(value){if(!validator.isEmail(value)){throw new Error("enter valid email id ")}}},
        password:{type:String, required:true,minLength:6,maxLength:105,validate(value){if(!validator.isStrongPassword(value)){throw new Error("enter strong password")}}},
        age:{type:Number, min :18,max:120},
        gender:{type:String,required:true,validate(value){if(!["male","female","others"].includes(value.toLowerCase())){throw new Error("invalid error")}
        }},
        photoUrl:{type:String,default:"https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png",validate(value){if(!validator.isURL(value)){throw new Error("invalid photo url")}}},
        about:{type:String,default:"this is a default about String"},
        skills:{type:[String],default:[]}
},{timestamps:true}
);  

const userModule = mongoose.model("User",userSchema);
module.exports= userModule; 