let express = require('express');
let bodyParser = require('body-parser');
const multer = require('multer');
var storage = multer.memoryStorage()
var upload = multer({storage: storage});
 

let router = express.Router();
const cameraservice = require('../controllers/controller.js');

router.use(bodyParser.json({limit: '50mb'})); 
router.use(bodyParser.urlencoded({limit: '50mb', extended: true} ));

router.post('/api/files/send',upload.any(),cameraservice.sendEmail);
module.exports = router;