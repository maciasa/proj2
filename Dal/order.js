var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.Getorders = function(callback) {
    connection.query ('select orders.order_id, orders.ordernumber, orders.orderdate, payment.paytype from orders join payment' +
        'on payment.pay_id = orders.pay_id;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}