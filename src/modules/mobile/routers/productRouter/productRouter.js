const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const productController = require('../../controllers/productController/productController')




router.post('/addProduct',upload.none(),productController.addProduct)
router.put('/updateProduct/:id',upload.none(),productController.updateProduct)
router.get('/readProductById/:id',productController.readProductById)
router.get('/readAllProducts',productController.readAllProducts)

module.exports = router