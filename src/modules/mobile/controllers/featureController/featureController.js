const featureModel = require('../../models/featuresModel/featuresModel')


const addFeature = async(req,res)=>{
    try{
        const getFeature = {
            category_id:req.body.category_id,
            feature:req.body.feature,
            featureSlug:req.body.feature.toLowerCase().replace(/ /g,'-')
        }

        const existingslug = await featureModel.findOne({featureSlug:getFeature.featureSlug})
             if(existingslug)
             {
                return res.send("Slug is already added")
             }
        const features = new featureModel(getFeature)
        await features.save()
        res.send(features)  

    }
    catch(error)
    {
        res.status(500).json("Something went wrong, Please select your command")
        console.log(error)
    }
}


const updateFeature = async(req,res)=>{
    try{
        const features = await featureModel.findById(req.params.id)
        if(req.body.feature)
        {
            features.feature = req.body.feature
        }
        if(req.body.featureSlug)
        {
            features.featureSlug = req.body.featureSlug.toLowerCase().replace(/ /g,'-')
        }
        else{
            features.featureSlug
        }
        if(req.body.category_id)
        {
            features.category_id = req.body.category_id
        }

        await features.save()
        res.status(200).send(`${features} is updated successfully`)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}

const readFeatureById = async(req,res)=>{
    try{
        const features = await featureModel.findById(req.params.id)
        if(!features)
        {
            return res.send("Id not found")
        }
        res.status(200).send(features)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}


const readAllFeature = async(req,res)=>{
    try{
        const features = await featureModel.find()
        res.send(features)

    }
    catch(error)
    {
        return res.status(500).json("something went wrong")
    }
}

const softDelFeature = async(req,res)=>{
    try{
         const features = await featureModel.findById(req.params.id)
         if(!features)
         {
            return res.status(500).json("Id not found")
         }
         features.status = req.body.status

         let statusType = ''
         if(req.body.status == "1")
         {
           statusType = "Active"
         }
         if(req.body.status == "2")
         {
            statusType = "Inactive"
         }
         await features.save()
         res.status(200).json(statusType)
    }
    catch(error)
    {
        res.status(500).json("something went wrong")
        console.log(error)
    }
}

module.exports = {addFeature,updateFeature,readFeatureById,readAllFeature,softDelFeature}