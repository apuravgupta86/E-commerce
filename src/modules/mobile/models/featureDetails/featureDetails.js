const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specification_category',
        required:true
    },
    feature_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'specification_feature',
        required:true
    },
    featureDetail:{
        type:String
    }
},
{timestamps: true}
)

module.exports = mongoose.model('feature_detail', detailSchema)
