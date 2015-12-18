var express = require('express');
var router = express.Router();
var orderdetailsDal = require('../Dal/orderdetails');

router.get('/orderdetail', function(req, res) {
    orderdetailsDal.GetAll(function (err, result) {
            if (err) throw err;
            //res.send(result);
            res.render('orderdet.ejs', {rs: result});
        }
    );
});


module.exports = router;