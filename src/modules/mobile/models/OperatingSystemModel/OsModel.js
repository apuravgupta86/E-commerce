const mongoose = require('mongoose')


const OSSchema = new mongoose.Schema({
    OS_type:{
        type: String,
        required: true
    },
    OS_slug:{
        type: String
        
    },
    status:{
         type: Number,
         default : 1
    },
},
{timestamps:true}
)


module.exports = mongoose.model("os_type",OSSchema)