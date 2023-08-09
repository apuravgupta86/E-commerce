const express = require('express')
const router = express.Router()
const modelmodelController = require('../../controllers/modelController/modelController')
const multer = require('multer')
const upload = multer()



router.post('/addModel',upload.none(),modelmodelController.addModel)
router.put('/updatemodel/:id',upload.none(),modelmodelController.updatemodelmodel)
router.get('/readAllmodels',modelmodelController.readAllmodelmodels)
router.get('/readmodelById',modelmodelController.readmodelmodelById)
router.put('/softDelmodel/:id',upload.none(),modelmodelController.softDelmodelmodel)



module.exports = router

