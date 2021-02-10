var express = require('express');
var router = express.Router();
var gsheet_controller = require('../controllers/gsheetController');

router.post('/', gsheet_controller.gsheet_post);

module.exports = router;