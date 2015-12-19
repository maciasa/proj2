var express = require('express');
var router = express.Router();
var productDal   = require('../Dal/product');

router.get('/', function(req, res) {
    productDal.Getproduct(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('product.ejs', {rs: result});
        }
    );
});

module.exports = router;