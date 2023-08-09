const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer()
const {addVersion,updateOsVersion,readAllOsVersion,readOsVersion,softdeleteOsVersion} = require('../../controllers/versionController/OsVersionController')







router.post('/addVersion',upload.none(), addVersion)
router.get('updateOsVersion/:id', upload.none(), updateOsVersion)
router.get('/readOsVersion/:id',readOsVersion)
router.get('/readAllOsVersion',readAllOsVersion)
router.put('/softdeleteOsVersion/:id', upload.none(), softdeleteOsVersion)





module.exports = router