const featureDetailModel = require('../../models/featureDetails/featureDetails')


const addFeatureDetail = async(req,res)=>{
    try{
        const formerror = {}

        if(req.body.category_id === undefined)
        {
            formerror.category_id = "Specification category is required"
        }
        if(req.body.feature_id === undefined)
        {
            formerror.feature_id = "Feature is required"
        }
        if(Object.keys(formerror).length!== 0)
        {
            res.send(formerror)
        }

        const getDetails = {
            category_id:req.body.category_id,
            feature_id:req.body.feature_id,
            featureDetail:req.body.featureDetail
        }

        const details = new featureDetailModel(getDetails)

         if(req.body.featureDetail === undefined)
         {
            details.featureDetail = "-"
         }
         else{
            details.featureDetail = req.body.featureDetail
         }

        await details.save()

        res.send(details)


    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}


module.exports = {addFeatureDetail}