const addressmodel = require('../models/addressModel')


const addAddress = async(req,res)=>{
    try{
        const formerror = {}
        if(req.body.user_id === undefined)
        {
            formerror.user_id = "User id is required"
        }
        if(req.body.addressType === undefined)
        {
            formerror.addressType = "Address type is required"
        }
        if(req.body.address === undefined)
        {
            formerror.address = "Address is required"
        }
        if(req.body.pincode === undefined)
        {
            formerror.pincode = "Pincode is required"
        }
        if(req.body.state === undefined)
        {
            formerror.state = "State is required"
        }
        if(Object.keys(formerror).length!==0)
        {
            res.send(formerror)
        }

        const getAdress = {
            user_id:req.body.user_id,
            addressType:req.body.addressType,
            address:req.body.address,
            pincode:req.body.pincode,
            state:req.body.state
        }

        const addressData = new addressmodel(getAdress)
        await addressData.save()
        res.status(200).send(addressData)


    }
    catch(error)
    {
        console.log(error)
        res.status(500).json("Something went wrong")
        
    }
}



const updateAddress = async(req,res)=>{
    try{
        const addressData = await addressmodel.findById(req.params.id)

        if(req.body.user_id)
        {
            addressData.user_id = req.body.user_id
        }
        if(req.body.addressType)
        {
            addressData.addressType = req.body.addressType
        }if(req.body.address)
        {
            addressData.address = req.body.address
        }if(req.body.pincode)
        {
            addressData.pincode = req.body.pincode
        }if(req.body.state)
        {
            addressData.state = req.body.state
        }

        await addressData.save()
        res.send(`${addressData} is changed successfully`)
        

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}

const readAllUserAdress = async(req,res)=>{
    try{
        const addressData = await addressmodel.findById(req.params.id)
        if(!addressData)
        {
            res.send("Id not found")
        }
        res.send(addressData)

    }
    catch(error)
    {
        res.status(500).json("Somehting Went Wrong")
    }
}


const softDeladdress = async(req,res)=>{
    try{
          const addressData = await addressmodel.findById(req.params.id)
          if(!addressData)
          {
            return re.status(500).json("Id not found")
          }
          addressData.status = req.body.status
          let statusType = ""
          if(req.body.status === "1")
          {
            statusType = "Active"
          }
          if(req.body.status === "2")
          {
            statusType = "Inactive"
          }
          await addressData.save()
          res.send(addressData)

    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
        // console.log(error)
    }
}

 
module.exports = {addAddress,updateAddress,readAllUserAdress,softDeladdress}