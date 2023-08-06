var express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const { getRecentPosts } = require('../middleware/posts');
var router = express.Router();


/* GET home page. */
router.get('/', getRecentPosts ,function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Sulav Jung Hamal", ishidden: true });
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




module.exports = router;
