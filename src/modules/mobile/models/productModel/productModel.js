const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    os_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'os_type',
        required:true
    },
    version_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'os_version',
        required:true
    },
    brand_id:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'brand',
         required:true
    },
    model_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'model',
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
    },
    priceAfterDiscount:{
        type:Number
    },
    productName:{
        type:String,
    },
    productSlug:{
        type:String
    }    
})

module.exports = mongoose.model('electronic_product',productSchema)