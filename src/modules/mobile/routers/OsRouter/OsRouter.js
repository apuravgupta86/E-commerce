const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {addOsType,read_by_id,readOperators,softdelOS} = require('../../controllers/operatingSystemController/OsController')







router.post('/addOStype',upload.none(), addOsType)
router.get('/readOS/:id',read_by_id)
router.get('/readallOS',readOperators)
router.put('/softdelOS/:id', upload.none(), softdelOS)





module.exports = router