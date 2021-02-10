var express = require('express');
var router = express.Router();
var thtg_controller = require('../controllers/thtgController');

router.get('/investment', thtg_controller.investment);
router.get('/product', thtg_controller.product);
router.get('/', function(req, res){
    res.send('go to /thtg/product or /thtg/investment');
});

module.exports = router;