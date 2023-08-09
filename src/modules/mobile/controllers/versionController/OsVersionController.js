const versionModel = require('../../models/versionModel/versionModel')
const mongoose = require('mongoose')


const addVersion = async(req,res)=>{
    try{
        const formerror = {}

    if(req.body.os_id === undefined)
    {
        formerror.os_id = " OS type is required"
    }    
    if(req.body.Os_version === undefined)
    {
        formerror.Os_version = " Operating system is required"
    }    
    if(Object.keys(formerror).length!==0)
    {
        return res.send(formerror)
    }
    const getData = {
        Os_version:req.body.Os_version,
        Os_version_slug:req.body.Os_version.toLowerCase().replace(/ /g , '-'),
        os_id:req.body.os_id

    }
    
    const existingslug = await versionModel.findOne({Os_version_slug:getData.Os_version_slug})
    if(existingslug)
    {
        return res.send("Slug already added")
    }            
    const OS = new versionModel(getData)
    await OS.save()
    res.send(OS)     
    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}


const updateOsVersion = async(req,res)=>{
    try{
        const OS = await versionModel.findById(req.params.id)
        if(req.body.Os_version)
        {
        OS.Os_version = req.body.Os_version
        }
        if(req.body.Os_version_slug)
        {
            OS.Os_version_slug = req.body.Os_version_slug.toLowerCase().replace(/ /g,"-")
        } else{
            OS.Os_version_slug
        }

        await OS.save()
        res.status(200).json(`${OS} is updated succussfully`)
    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}

const readOsVersion = async(req,res)=>{
    try{
        const OS = await versionModel.findById(req.params.id)
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


const readAllOsVersion = async(req,res)=>{
    try{
        const OS = await versionModel.find()
        res.send(OS)
    }
    catch(error)
    {
        res.status(500).json("Something went wrong")
    }
}


const softdeleteOsVersion = async(req,res)=>{
    try{
        const OS = await versionModel.findById(req.params.id)
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
module.exports = {addVersion,updateOsVersion,readAllOsVersion,readOsVersion,softdeleteOsVersion}