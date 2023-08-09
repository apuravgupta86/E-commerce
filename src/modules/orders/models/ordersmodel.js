const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
       user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user_detail',
        // required:true
       },
       brand:{
        type:String,
        required:true
       },
       model:{
        type:String,
        required:true
       },
       userName:{
        type:String,
        required:true
       },
       contactNo:{
        type:Number,
        required:true
       },
       email:{
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
       totalPrice:{
        type:Number,
        required:true
        },
        discount:{
        type:Number,
        default:0
        },
        priceAfterDiscount:{
        type:Number
        },
        order_id:{
            type:String,
            unique:true
        }
       


},
{timestamps:true}
)

module.exports = mongoose.model("order", orderSchema)