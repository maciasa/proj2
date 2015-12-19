var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.Getdetails = function(callback) {
    var query = 'select od.orderdetail_id, account.fname, account.lname, orders.ordernumber, product.productprice, od.total ' +
         'from account join orders on account.a_id = orders.a_id join orderdetails od on od.order_id = orders.order_id join product on product.product_id = od.product_id;'
    console.log(query);
    connection.query(query,
        function (err, result) {
            if (err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};