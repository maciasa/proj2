var express = require('express');
var router = express.Router();
var orderdetailsDal = require('../Dal/orderdetails');

router.get('/', function(req, res) {
    orderdetailsDal.Getdetails(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('orderdet.ejs', {rs: result});
        }
    );
});


module.exports = router;