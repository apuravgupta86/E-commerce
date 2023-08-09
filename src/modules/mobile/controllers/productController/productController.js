const productmodel = require('../../models/productModel/productModel')
const brandmodel = require('../../models/brandModel/brandModel')


const addProduct = async(req,res)=>{
    try{
        const formerror ={}
        if(req.body.os_id === undefined)
        {
            formerror.os_id = "Type of OS is required"
        }
        if(req.body.version_id === undefined)
        {
            formerror.version_id = "OS version is required"
        }
        if(req.body.brand_id === undefined)
        {
            formerror.brand_id = " Brand is required"
        }
        if(req.body.model_id === undefined)
        {
            formerror.model_id = "Model is required"
        }
        if(req.body.totalPrice === undefined)
        {
            formerror.totalPrice = "Total price is required"
        }
        if(Object.keys(formerror).length!== 0)
        {
            return res.send(formerror)
        }
         
          
        const getProduct = {
            os_id:req.body.os_id,
            version_id:req.body.version_id,
            brand_id:req.body.brand_id,
            model_id:req.body.model_id,
            totalPrice:req.body.totalPrice,
            productName:req.body.productName,
            productSlug:req.body.productName.toLowerCase().replace(/ /g,'-')
            // discount:req.body.discount?req.body.discount:"",
            // priceAfterDiscount:req.body.totalPrice - req.body.discount?req.body.discount === undefined:priceAfterDiscount=req.body.totalPrice
            
        }

        const existingslug = await productmodel.findOne({productSlug:getProduct.productSlug})
        if(existingslug)
        {
            return res.send("Slug is already added")
        }



        const products = new productmodel(getProduct)
        req.body.discount?products.discount=req.body.discount:'';
        products.priceAfterDiscount=req.body.discount?req.body.totalPrice - req.body.discount:req.body.totalPrice
        await products.save()
        res.status(200).send(products)

    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json("Something went wrong")
    }
}


const updateProduct = async(req,res)=>{
    try{
        const products = await productmodel.findById(req.params.id)

        if(req.body.os_id)
        {
            products.os_id = req.body.os_id
        }
        if(req.body.version_id)
        {
            products.version_id = req.body.version_id
        }
        if(req.body.brand_id)
        {
            products.brand_id = req.body.brand_id
        }
        if(req.body.model_id)
        {
            products.model_id = req.body.model_id
        }
        if(req.body.totalPrice)
        {
            products.totalPrice = req.body.totalPrice
        }
        if(req.body.discount)
        {
            products.discount = req.body.discount
        }
        if(req.body.totalPrice || req.body.discount)
        {
            products.priceAfterDiscount = req.body.totalPrice - req.body.discount
        }
        if(req.body.productName)
        {
            products.productName = req.body.productName
        }
        if(req.body.productSlug)
        {
            products.productSlug =  req.body.productName.toLowerCase().replace(/ /g,'-') 
        }

        await products.save()
        res.send(`${products} is updated sucessfully`)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}


const readProductById = async(req,res)=>{
    try{
        const products = await productmodel.findById(req.params.id).populate([
            {path:'brand_id', select:['brand_name']}
        ])
        .populate([
            {path:'model_id', select:['modelName']}
        ])
        .populate([
            {path:'os_id', select:['OS_type']}
        ])
        .populate([
            {path:'version_id', select:['Os_version']}
        ])
        if(!products)
        {
            return res.send("Id not found")
        }    
        res.send({products})
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).send("Something went wrong")

    }
}

const readAllProducts = async(req,res)=>{
    try{
        const products = await productmodel.find().populate([
            {path:'brand_id', select:['brand_name']}
        ])
        .populate([
            {path:'model_id', select:['modelName']}
        ])
        .populate([
            {path:'os_id', select:['OS_type']}
        ])
        .populate([
            {path:'version_id', select:['Os_version']}
        ])

        res.json(products)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}

module.exports = {addProduct , updateProduct , readProductById, readAllProducts}