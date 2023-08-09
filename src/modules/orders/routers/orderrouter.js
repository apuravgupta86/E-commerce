const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const orderController = require('../controllers/orderController')



router.post('/addOrder',upload.none(),orderController.addOrders)



module.exports = router