const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {addBrand,updateBrand,readBrandNameById,readAllBrands,softdeleteBrand} = require('../../controllers/brandController/brandController')






router.post('/addBrand',upload.none(),addBrand)
router.put('/updateBrand/:id',upload.none(),updateBrand)
router.get('/readBrandNameById/:id',readBrandNameById)
router.get('/readAllBrands',readAllBrands)
router.put('/softdeleteBrand/:id',upload.none(),softdeleteBrand)











module.exports = router