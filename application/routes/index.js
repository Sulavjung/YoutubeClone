var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Sulav Jung Hamal", js:["photoDisplay.js"], ishidden: true });
});

/* GET Login Page.  */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login', name:"Sulav Jung Hamal"});
});  

router.get('/postvideo', isLoggedIn, function(req, res, next) {
  res.render('postvideo', { title: 'Post Video', name:"Sulav Jung Hamal" });
});
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Registration', name:"Sulav Jung Hamal", js:["script.js"] });
});
router.get('/viewpost', function(req, res, next) {
  res.render('viewpost', { title: 'View Post', name:"Sulav Jung Hamal",  });
});

module.exports = router;
