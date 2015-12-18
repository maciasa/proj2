var express = require('express');
var router = express.Router();
var accountDal   = require('../dal/account');

/* GET home page. */
router.get('/', function(req, res, next) {
      if(req.session.account === undefined) {
        res.render('userpage.ejs');
      }
      else {
        var data = { firstname : req.session.account.fname };
        res.render('userpage.ejs', { title: 'Express' });
      }
    }
);

router.get('/login', function(req, res) {
  res.render('authentication/login.ejs', {title:'User Authentication Example'});
});

router.get('/authenticate', function(req, res) {
  if(req.session.account == undefined) { //user isn't authenticated yet

    accountDal.GetByEmail(req.query.email, function (err, account) {
      // if there are any errors, return the error before anything else
      if (err) {
        res.render('authentication/login.ejs', {msg: err});  //TODO: Handle the error; for now return it to the browser as text
      }

      // if no user is found, return the message
      else if (account == null) {
        res.render('authentication/login.ejs', {msg: "User not found."});
      }

      // if the user is found but the password is wrong
      // NOTE: That stored procedures will return the records within an extra array
      else if (account.password != req.query.password)
        res.render('authentication/login.ejs', {msg: "Passwords do not match."});

      else {  // user exists and passwords match!
        // Save the user's information to the server's session.
        // The session will only expire once the user closes their browser or we call req.session.destroy()
        // This is configurable though; https://github.com/expressjs/session
        req.session.account = account;
        res.send('User successfully logged in.');  //TODO: Send user the page they were trying to login to.
      }
    });
  }
  else {  //user already authenticated, so send them to the homepage
    res.redirect('/');
  }
});

router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('authentication/logout.ejs');
  });
});

router.get('/signup', function(req, res) {
  res.render('userFormCreate.ejs');
});

router.get('/foundbyoptions', function(req, res ){
  accountDal.GetFoundByOptions(function(err,options){
    res.send(options);
  });
});

router.get('/saveUserAjax', function(req, res) {
  console.log(req.query);

  accountDal.Insert(req.query, function(err, result) {
    if (err) {
      var responseData = {success: false, error: err.message};
      res.send(responseData);
    }
    else {
      accountDal.InsertAccountFoundBy(result.insertId, req.query.selectedOptions, function(err,result) {
        if (err) {
          var responseData = {success: false, error: err.message};
          res.send(responseData);
        }
        var responseData = {success: true, error: err.message};
        res.send(responseData);
      })
    }
  });
});
router.get('/foundbyoptions', function(req, res){
  account.GetFoundByOptions(function(err,options) {
    res.send(options);
  })
  });

router.get('/foundbyoptions', function(req, res){
  account.GetFoundByOptions(function(err,options){
    res.send(options);
  });
});

module.exports = router;