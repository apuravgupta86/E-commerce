const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const featureController = require('../../controllers/featureController/featureController')






router.post('/addfeature',upload.none(),featureController.addFeature)
router.put('/updatefeature/:id',upload.none(),featureController.updateFeature)
router.get('/readfeatureById/:id',featureController.readFeatureById)
router.get('/readAllfeature',featureController.readAllFeature)
router.put('/softDelfeatureStatus/:id',upload.none(),featureController.softDelFeature)


module.exports = router




