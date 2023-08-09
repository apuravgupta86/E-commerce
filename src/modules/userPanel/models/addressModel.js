const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_detail',
        required:true
    },
    addressType:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps:true}
)

module.exports = mongoose.model('user_address',addressSchema)