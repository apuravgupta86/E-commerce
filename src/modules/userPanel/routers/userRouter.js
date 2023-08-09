const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const userController = require('../controller/userController')




router.post('/adduserdetails',upload.none(),userController.addUserDetails)
router.put('/updateUserdetails/:id',upload.none(),userController.updateUserDetail)
router.get('/readUserById/:id',userController.readUserById)
router.delete('/deleteUser/:id',userController.deleteUser)


module.exports = router