const mongoose = require('mongoose')
const brandModel = require('../../models/brandModel/brandModel')


const addBrand = async(req,res)=>{
    try{
        const formerror = {}
        if(req.body.os_id === undefined)
        {
            formerror.os_id = "OS type is required"
        }
        if(req.body.brand_name === undefined)
        {
            formerror.brand_name = " Brand_name is required"
        }
        if(Object.keys(formerror).length!==0)
        {
            return res.status(500).json(formerror)
        }

        const getData ={
            os_id : req.body.os_id,
            brand_name : req.body.brand_name,
            brand_slug : req.body.brand_name.toLowerCase().replace(/ /g,"-")
        }

        const existingslug = await brandModel.findOne({brand_slug:getData.brand_slug})
        if(existingslug)
        {
            return res.status(200).json("Slug is adready been created")
        }

        const brands = new brandModel(getData)
        await brands.save()
        res.status(200).json(brands)

    }
    catch(error)
    {
        res.status(500).json("something went wrong")
    }
}


const updateBrand = async(req,res)=>{
    try{
        const brands = await brandModel.findById(req.params.id)
        
        if(req.body.brand_name)
        {
            brands.brand_name = req.body.brand_name
        }
        if(req.body.brand_slug)
        {
            brands.brand_slug = req.body.brand_slug.toLowerCase().replace(/ /g,"-")
        } else{
            brands.brand_slug
        }
        if(req.body.os_id)
        {
            brands.os_id = req.body.os_id
        }
       

        await brands.save()
        res.status(200).json(`${brands} is updated successfully`)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}


const readBrandNameById = async(req,res)=>{
    try{

        const brands = await brandModel.findById(req.params.id)
        if(!brands)
        {
            res.status(500).json("Id not found, Please try Again")
        }
        res.status(200).json(brands)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}


const readAllBrands = async(req,res)=>{
try{

    const brands = await brandModel.find()
    res.status(200).json(brands)

}
catch(error)
{
    res.status(500).json("Something went wrong")
}
}


const softdeleteBrand = async(req,res)=>{
    try{
        const brands = await brandModel.findById(req.params.id)
        if(!brands)
        {
            return res.status(500).json({status:2,message:"Brands not found"});
        }
        brands.status = req.body.status
        let statusType = ""
        if(req.body.status === "1")
        {
            statusType = "Active"
        }
        if(req.body.status === "2")
        {
            statusType = "Inactive"
        }
        await brands.save()
        res.status(200).json({status:1,message:`${brands.brand_name} Created Successfully.`,brands});

    }
    catch(error)
    {
    res.status(500).json({status:0,message:"Something went wrong"})
    }

}


module.exports = {addBrand,updateBrand,readBrandNameById,readAllBrands,softdeleteBrand}