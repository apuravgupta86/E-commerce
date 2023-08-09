const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const specificationCategorycontroller = require('../../controllers/specificationCategoryController/specificationCategoryController')






router.post('/addSpecificationCategory',upload.none(),specificationCategorycontroller.addCategory)
router.put('/updateSpecificationCategory/:id',upload.none(),specificationCategorycontroller.updateCategory)
router.get('/readSpecificationCategoryById/:id',specificationCategorycontroller.readCategoryById)
router.get('/readAllSpecificationCategory',specificationCategorycontroller.readAllCategory)
router.put('/softDelSpecificationStatus/:id',upload.none(),specificationCategorycontroller.softDelCategory)


module.exports = router