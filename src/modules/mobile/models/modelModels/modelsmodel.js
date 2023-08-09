const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    brand_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand'
    },
    modelName:{
        type: String,
        requried:true
    },
    modelSlug:{
        type: String,
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps:true}
)

module.exports = mongoose.model('model',modelSchema)