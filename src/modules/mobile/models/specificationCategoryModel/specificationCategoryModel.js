const mongoose = require('mongoose')


const specificationSchema = new mongoose.Schema({
    specificationCategory:{
        type:String,
        required:true
    },
    specificationCategorySlug:{
        type:String
    },
    status:{
        type:Number,
        default:1
    }
},
{timestamps: true}
)

module.exports = mongoose.model('specification_category',specificationSchema)