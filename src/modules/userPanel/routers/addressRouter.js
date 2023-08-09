const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const addressController = require('../controller/userAdress')





router.post('/addaddress',upload.none(),addressController.addAddress)
router.put('/updateAdress/:id',upload.none(),addressController.updateAddress)
router.get('/readAllAdress/:id',addressController.readAllUserAdress)
router.put('/softDelAdress/:id',upload.none(),addressController.softDeladdress)


module.exports = router