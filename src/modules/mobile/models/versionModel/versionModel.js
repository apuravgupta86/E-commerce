const mongoose = require('mongoose')


const OsSchema = new mongoose.Schema({
        os_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'os_type'
        },
        Os_version:{
            type: String,
            required:true
        },
        Os_version_slug:{
            type:String,
        },
        status:{
            type:Number,
            default:1
        }
},
{timestamps:true}
)

module.exports = mongoose.model("os_version",OsSchema)