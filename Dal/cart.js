var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.Getcart = function(callback) {
    connection.query ('elect cart.cart_id, orders.ordernumber, sum(od.quantity) as total, sum(od.total) as price from orderdetails od' +
        'join orders on orders.order_id = od.order_id join cart on cart.order_id = orders.order_id' +
        'order by orders.ordernumber DESC;',
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