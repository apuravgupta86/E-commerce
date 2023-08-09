const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    }
},
{timestamps:true}
)

module.exports = mongoose.model('user_detail',userSchema)