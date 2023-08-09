const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
    os_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'os_type'
    },
    version_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'os_version'
    },
    brand_name:{
        type: String,
        required:true
    },
    brand_slug:{
        type:String
    },
    status:{
        type:Number,
        default:1
    }

},
{timestamps:true}
)


module.exports = mongoose.model("brand", BrandSchema)
