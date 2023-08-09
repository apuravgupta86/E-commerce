const featureDetailsController = require('../../controllers/featureDetails/featureDetail')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()




router.post('/addFeatureDetails',upload.none(),featureDetailsController.addFeatureDetail)


module.exports = router