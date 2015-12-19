var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.Getorders = function(callback) {
    connection.query ('select p1.pay_id, o1.ordernumber, o1.orderdate, p1.paytype from payment p1 join orders o1 ON p1.pay_id = o1.pay_id;',
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