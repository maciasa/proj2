var express = require('express');
var router = express.Router();
var cartDal   = require('../Dal/cart');

router.get('/cart', function(req, res) {
    cartDal.Getcart(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('cart.ejs', {rs: result});
        }
    );
});


module.exports = router;