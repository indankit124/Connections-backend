const mongoose= require("mongoose");

const connectioRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:'{VALUE} is not supported'
        },required:true
    }
    

},
{timestamps:true})


const ConnectionRequestModel = mongoose.model("ConnectionRequestModel",connectioRequestSchema)


module.exports= ConnectionRequestModel