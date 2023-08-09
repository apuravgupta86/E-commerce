const specificationCategoryModel = require('../../models/specificationCategoryModel/specificationCategoryModel')


const addCategory = async(req,res)=>{
    try{
             const  formerror ={}
          if(req.body.specificationCategory === undefined)
          {
            formerror.specificationCategory = "Specification type is required"
          }
          if(Object.keys(formerror).length!== 0)
          {
            return res.send(formerror)
          }


        const getCategory = {
            specificationCategory:req.body.specificationCategory,
            specificationCategorySlug:req.body.specificationCategory.toLowerCase().replace(/ /g,'-')
        }

        const existingslug = await specificationCategoryModel.findOne({specificationCategorySlug:getCategory.specificationCategorySlug})
             if(existingslug)
             {
                return res.send("Slug is already added")
             }
        const categories = new specificationCategoryModel(getCategory)
        await categories.save()
        res.send(categories)  

    }
    catch(error)
    {
        res.status(500).json("Something went wrong, Please select your command")
    }
}


const updateCategory = async(req,res)=>{
    try{
        const categories = await specificationCategoryModel.findById(req.params.id)
        if(req.body.specificationCategory)
        {
            categories.specificationCategory = req.body.specificationCategory
        }
        if(req.body.specificationCategorySlug)
        {
            categories.specificationCategorySlug = req.body.specificationCategorySlug.toLowerCase().replace(/ /g,'-')
        }
        else{
            categories.specificationCategorySlug
        }

        await categories.save()
        res.status(200).send(`${categories} is updated successfully`)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}

const readCategoryById = async(req,res)=>{
    try{
        const categories = await specificationCategoryModel.findById(req.params.id)
        if(!categories)
        {
            return res.send("Id not found")
        }
        res.status(200).send(categories)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}


const readAllCategory = async(req,res)=>{
    try{
        const categories = await specificationCategoryModel.find()
        res.send(categories)

    }
    catch(error)
    {
        return res.status(500).json("something went wrong")
    }
}

const softDelCategory = async(req,res)=>{
    try{
         const categories = await specificationCategoryModel.findById(req.params.id)
         if(!categories)
         {
            return res.status(500).json("Id not found")
         }
         categories.status = req.body.status

         let statusType = ''
         if(req.body.status == "1")
         {
           statusType = "Active"
         }
         if(req.body.status == "2")
         {
            statusType = "Inactive"
         }
         await categories.save()
         res.status(200).json(statusType)
    }
    catch(error)
    {
        res.status(500).json("something went wrong")
        console.log(error)
    }
}

module.exports = {addCategory,updateCategory,readCategoryById,readAllCategory,softDelCategory}