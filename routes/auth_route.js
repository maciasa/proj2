var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/account');

router.get('/authenticate', function(req, res) {
    accountDal.GetByEmail(req.query.email, function (err, account) {
        if (err) {
            res.render('authentication/login.ejs', { msg: err});
        }
        else if (account == null) {
            res.render('authentication/login.ejs', { msg: "User not found."});
        }
        else if (account.password != req.query.password)
            res.render('authentication/login.ejs', {msg: "Passwords do not match."});
        else {
            req.session.account = account;
            res.send('User successfully logged in.');
        }
    });
});
module.exports = router;
