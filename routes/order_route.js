var express = require('express');
var router = express.Router();
var orderDal   = require('../Dal/order');

router.get('/orders', function(req, res) {
    orderDal.Getorders(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('order.ejs', {rs: result});
        }
    );
});


module.exports = router;