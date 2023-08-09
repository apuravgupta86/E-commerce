const mongoose = require('mongoose')


const featureSchema = new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specification_category'
    },
    feature:{
        type:String,
    },
    featureSlug:{
        type:String
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps: true}
)

module.exports = mongoose.model('specification_feature',featureSchema)


