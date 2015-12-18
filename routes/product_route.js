var express = require('express');
var router = express.Router();
var productDal   = require('../Dal/product');

router.get('/product', function(req, res) {
    productDal.GetAll(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('product.ejs', {rs: result});
        }
    );
});

module.exports = router;