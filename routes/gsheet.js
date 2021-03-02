var express = require('express');
var router = express.Router();
var gsheet_controller = require('../controllers/gsheetController');
var multer = require('multer');
var upload = multer({dest: 'uploads/'}) 

router.post('/', upload.array("files", 3), gsheet_controller.gsheet_post);

module.exports = router;