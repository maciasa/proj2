var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.Getpayment = function(callback) {
    connection.query ('SELECT p.paytype, o.ordernumber FROM payment p INNER JOIN orders o ' +
        'ON o.pay_id = p.pay_id WHERE o.ordernumber <' +
        '(SELECT AVG(ordernumber) FROM orders);',
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