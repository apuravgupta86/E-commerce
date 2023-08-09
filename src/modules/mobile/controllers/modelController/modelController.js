const modelmodel = require('../../models/modelModels/modelsmodel')


const addModel = async(req,res)=>{
    try{
        const formerror = {}
        if(req.body.brand_id === undefined)
        {
            formerror.brand_id = "Brand is required"
        }
        if(req.body.modelName === undefined)
        {
            formerror.modelName = "Model Name is required"
        }
        if(Object.keys(formerror).length !== 0)
        {
            return res.json(formerror)
        }

        const getModels = {
            brand_id:req.body.brand_id,
            modelName:req.body.modelName,
            modelSlug:req.body.modelName.toLowerCase().replace(/ /g,'-')
        }

        const existingslug = await modelmodel.findOne({modelSlug:getModels.modelSlug})
        if(existingslug)
        {
            return res.send("Slug is already added")
        }

        const models = new modelmodel(getModels)
        await models.save()
        res.status(200).json(models)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong, Please try again")
        // console.log(error)
    }
}


const updatemodelmodel = async(req,res)=>{
    try{
         const models = await modelmodel.findById(req.params.id)
         if(req.body.brand_id)
         {
            models.brand_id = req.body.brand_id
         }
         if(req.body.modelName)
         {
            models.modelName = req.body.modelName
         }
         if(req.body.modelSlug)
         {
            models.modelSlug = req.body.modelName.toLowerCase().replace(/ /g,"-")
         }
         else{
            models.modelSlug
         }

         await models.save()
         res.status(200).json(`${models} is updated successfully`)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}

const readAllmodelmodels = async(req,res)=>{
    try{
        const models = await modelmodel.find()
        if(!models)
        {
           return res.json("Cant find models")
        }
        res.send(models)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}

const readmodelmodelById = async(req,res)=>{
    try{
        const models = await modelmodel.findById(req.params.id)
        if(!models)
        {
            return res.send("ID not found")
        }
        res.status(200).send(models)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}


const softDelmodelmodel = async(req,res)=>{
    try{
          const models = await modelmodel.findById(req.params.id)
          if(!models)
          {
            return re.status(500).json("Models not found")
          }
          models.status = req.body.status
          let statusType = ""
          if(req.body.status === "1")
          {
            statusType = "Active"
          }
          if(req.body.status === "2")
          {
            statusType = "Inactive"
          }
          await models.save()
          res.send(models)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
        // console.log(error)
    }
}

module.exports = {addModel,updatemodelmodel,readAllmodelmodels,readmodelmodelById,softDelmodelmodel}