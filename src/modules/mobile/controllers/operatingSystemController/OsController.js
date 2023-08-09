const os_model = require('../../models/OperatingSystemModel/OsModel')
const mongoose = require('mongoose')


const addOsType = async(req,res)=>{
    try{
        const formerror = {}
    if(req.body.OS_type === undefined)
    {
        formerror.OS_type = " Operating system is required"
    }    
    if(Object.keys(formerror).length!==0)
    {
        return res.send(formerror)
    }

    const getData = {
        OS_type:req.body.OS_type,
        OS_slug:req.body.OS_type.toLowerCase().replace(/ /g , '-')
    }
    const existingslug = await os_model.findOne({OS_slug:getData.OS_slug})
    if(existingslug)
    {
        return res.send("Slug already added")
    }
    const OS = new os_model(getData)
    await OS.save()
    res.send(OS)
     
    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}
const read_by_id = async(req,res)=>{
    try{
        const OS = await os_model.findById(req.params.id)
        if(!OS)
        {
            return res.send("ID not found")
        }
        res.send(OS)

    }
    catch(error)
    {
        res.status(500).send("Something went wrong or ID not found")
    }
}
const readOperators = async(req,res)=>{
    try{
        const OS = await os_model.find()
        res.send(OS)
    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}
const softdelOS = async(req,res)=>{
    try{
        const OS = await os_model.findById(req.params.id)
        if(!OS)
        {
            return res.send("Operators not found")
        }
        OS.status = req.body.status
        let statusType = ''
        if(req.body.status === "1")
        {
            statusType = "Active"
        }
        if(req.body.status === "2")
        {
             statusType = "Inactive"
        }
        await OS.save()
        res.send(statusType)
    }
    catch(error)
    {
        re.status(500).json("Something went wrong")
    }
}
module.exports = {addOsType,read_by_id,readOperators,softdelOS}