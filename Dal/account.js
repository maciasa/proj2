var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);
exports.Getproduct = function(callback) {
 connection.query ('SELECT * FROM account;',
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

exports.GetByEmail = function(email, callback) {
 var query = 'CALL Account_GetByEmail(?)';
 var query_data = [email];
 connection.query(query, query_data, function(err, result) {
 if(err){
 callback(err, null);
 }
 // NOTE: Stored Procedure results are wrapped in an extra array
 // and only one user record should be returned,
 // so return only the one result
 else if(result[0].length == 1) {
 callback(err, result[0][0]);
 }
 else {
 callback(err, null);
 }
 });
}

exports.GetFoundByOptions = function(callback){
 connection.query("SELECT * FROM FoundBy", function(err, result) {
 callback(err, result);
 });
}
exports.GetAccountFoundyBy = function(account_id, callback) {
 connection.query("SELECT * FROM account_foundby WHERE account_id = ?" + [account_id],
     function(err, result) {
      callback(err,result);
     });
}