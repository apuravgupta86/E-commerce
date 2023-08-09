const userModel = require('../models/userModel')


const addUserDetails = async(req,res)=>{
    try{

        const formerror = {}

    if(req.body.first_name === undefined)
    {
        formerror.first_name = "First name is required"
    }
    if(req.body.last_name === undefined)
    {
        formerror.last_name = "Last name is required"
    }
    if(req.body.email === undefined)
    {
        formerror.email = "Email is required"
    }
    if(req.body.contactNo === undefined)
    {
        formerror.contactNo = "Contact no. is required"
    }
    if(Object.keys(formerror).length!== 0)
    {
        return res.send(formerror)
    }

    const getDetails ={
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        contactNo:req.body.contactNo
    }

    const users = new userModel(getDetails)
    await users.save()
    res.status(200).send(users)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
}


const updateUserDetail = async(req,res)=>{
    try{
        const users = await userModel.findById(req.params.id)

        if(req.body.first_name)
        {
            users.first_name = req.body.first_name
        }
        if(req.body.last_name)
        {
            users.last_name = req.body.last_name
        }
        if(req.body.email)
        {
            users.email = req.body.email
        }
        if(req.body.contactNo)
        {
            users.contactNo = req.body.contactNo
        }
           
        await users.save()
        res.status(200).send(`${users} is updated successfully`)
    }
    catch(error){
        res.status(500).json("Something went wrong")
    }
}

const readUserById = async(req,res)=>{
    try{
        const users = await userModel.findById(req.params.id)
        if(!users)
        {
            return res.status(500).json("Id not found")
        }
        res.status(200).send(users)

    }
    catch(error)
    {
        return res.status(500).json("Something went wrong")
    }
} 

const deleteUser = async(req,res)=>{
    try{
        const users = await userModel.findById(req.params.id)
        if(!users)
        {
            return res.send("ID not found")
        }
       const deleteUser = await userModel.deleteOne(users)
       console.log(deleteUser) 
       res.send(`${users} is deleted`)
    }
    catch(error)
    {
         res.send("Something went wrong")
        console.log(error)
    }

}

module.exports = {addUserDetails,updateUserDetail,readUserById,deleteUser}