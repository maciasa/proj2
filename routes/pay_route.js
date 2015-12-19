var express = require('express');
var router = express.Router();
var paymentDal   = require('../Dal/payment');

router.get('/', function(req, res) {
    paymentDal.Getpayment(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('payment.ejs', {rs: result});
        }
    );
});


module.exports = router;