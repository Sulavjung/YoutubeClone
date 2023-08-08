var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
const db = require("../config/database");
const { isLoggedIn, isCurrentUserProfile } = require("../middleware/auth");
const { validateUsername, validateEmail, validatePassword } = require("../middleware/validation");

//localhost:3000/users/register
router.post("/register", validateUsername, validateEmail, validatePassword, async function (req, res, next) {
  var { username, email, password } = req.body;

  if(res.locals.usernameInvalid || res.locals.passwordInvalid || res.locals.emailInvalid){
    req.flash("error", "Server side validation failed. Please try with different credentials.");
      return req.session.save(function (err) {
        return res.redirect("/registration");
      });
  }

  try {
    //server side validation
    // -> Uniqueness checks 
    // --> rules check

    //Encrypting the password.
    var hashedPassword = await bcrypt.hash(password, 5);
    var [results, _] = await db.execute(
      `select id from users where username = ?`,
      [username]
    );

    if (results && results.length > 0) {
      req.flash("error", "Username already exist");
      return req.session.save(function(err){
        return res.redirect("/registration");
      })
    }

    var [results, _] = await db.execute(
      `select id from users where email = ?`,
      [email]
    );

    if (results && results.length > 0) {
      req.flash("error", "Email already exists");
      return req.session.save(function(err){
        return res.redirect("/registration");
      })
    }

    //insert into db.
    var [insertResults, _] = await db.execute(
      `insert into users (username, email, password) value (?, ?, ?)`,
      [username, email, hashedPassword]
    );

    //respond.
    if (insertResults && insertResults.affectedRows == 1) {
      req.flash("success", "You successfully created your account.");
      return req.session.save(function (err) {
        return res.redirect("/login");
      });
    } else {
      return req.session.save(function (err) {
        return res.redirect("/registration");
      });
    }
  } catch (err) {
    next(err);
  }
});

//localhost:3000/users/login
router.post("/login", async function (req, res, next) {
  var { username, password } = req.body;
  var redirectTo = req.session.redirectTo || '/';

  console.log(redirectTo);

  try {
    //1. We are validating the username

    //We are validating the password.

    //Checking if the password and the email exist or not
    var [results, _] = await db.execute(
      `select id, username, email, password from users where username = ?`,
      [username]
    );

    const user = results[0];

    if (!user) {
      req.flash("error", "Login Failed: Invalid Credintial");
      return req.session.save(function (err) {
        return res.redirect("/login");
      });
    }

    var passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      req.session.user = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };
      req.flash("success", "You are successfully logged in.");
      return req.session.save(function (err) {
        return res.redirect(redirectTo);
      });
    } else {
      return req.session.save(function (err) {
        return res.redirect("/login");
      });
    }
    //Depending on that send them to the main page or display the error and keep it in the login page.
  } catch (err) {
    next(err);
  }
});

router.post("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    if (err) next(err);
    return res.redirect("/");
  });
});

router.get('/profile/:id(\\d+)',isLoggedIn, isCurrentUserProfile,  async function(req, res, next) {
  var {id} = req.params;
  try {

    var [users, __] = await db.execute(
      `select username from users where id = ?`,
      [id]
    );

    const user = users[0];

    if (!user) {
      req.flash("error", "User does not exist!");
      return req.session.save(function (err) {
        return res.redirect("/");
      });
    } else {
      res.locals.username = user.username;
    }


    const [results, _] = await db.execute(`
      SELECT p.id, p.title, p.description, p.thumbnail, p.video, p.createdAt, u.username
      FROM posts p
      JOIN users u ON p.fk_userId = u.id
      WHERE u.id = ?
      ORDER BY p.createdAt DESC
      LIMIT 20;
    `, [id]);

    if (results && results.length > 0) {
      res.locals.count = results.length;
      res.locals.results = results;
    } else {
      res.locals.results = [];
      res.locals.count = 0;
    }
  } catch (err) {
    next(err);
  }
  res.render('profile', { title: 'Profile', name: "Sulav Jung Hamal" });
});


module.exports = router;
