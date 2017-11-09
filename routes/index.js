var express = require('express');
var router = express.Router();
var path = require('path')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','index.html'));
});

router.get('/Login.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Login.html'));
});

router.get('/Signup.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Signup.html'));
});

router.get('/Contacts.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Contacts.html'));
});

router.get('/ContactsActions.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','ContactsActions.html'));
});



module.exports = router;
