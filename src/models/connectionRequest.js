const mongoose= require("mongoose");
const userModule =require("./user")

const connectioRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModule,
        //ref:"User",
        required:true,
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModule,
        //ref:"User",
        required:true,
      
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:'{VALUE} is not supported'
        },required:true
    }
    

},
{timestamps:true});

connectioRequestSchema.index({fromUserId:1,toUserId:1},{ unique: true })

connectioRequestSchema.pre("save",function(){
   const  ConnectionRequestModel= this;
    if(ConnectionRequestModel.toUserId.equals(ConnectionRequestModel.fromUserId)){
        throw new Error("You cannot send a connection request to yourself");            
    }
});


const ConnectionRequestModel = mongoose.model("ConnectionRequestModel",connectioRequestSchema)


module.exports= ConnectionRequestModel 