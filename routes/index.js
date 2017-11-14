var express = require('express');
var router = express.Router();
var path = require('path')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','index.html'));
});

router.get('/main.html', function(req, res, next) {
	  res.sendFile(path.join(__dirname,'../','views','main.html'));
	});

router.get('/aboutUs.html', function(req, res, next) {
	  res.sendFile(path.join(__dirname,'../','views','aboutUs.html'));
	});

router.get('/Login.view.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Login.view.html'));
});

router.get('/Signup.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Signup.html'));
});

router.get('/Contacts.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','Contacts.html'));
});

router.get('/AddContact.html', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../','views','AddContact.html'));
});

router.get('/DeleteContact.html', function(req, res, next) {
	  res.sendFile(path.join(__dirname,'../','views','DeleteContact.html'));
});

router.get('/UpdateContact.html', function(req, res, next) {
	  res.sendFile(path.join(__dirname,'../','views','UpdateContact.html'));
});





module.exports = router;
