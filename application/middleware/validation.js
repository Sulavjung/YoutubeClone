const validator = require("validator");

module.exports = {
  validateUsername: function (req, res, next) {
    const { username } = req.body;

    
	if(!validator.isAlpha(username[0])){
		res.locals.usernameInvalid = "Username should begin with a character([a-zA-z]).";
	}

	if(!validator.isAlphanumeric(username) || !validator.isLength(username, {min: 3})){
		res.locals.usernameInvalid = "Username should have 3 or more alphanumeric characters."
	}

    next();
  },
  validatePassword: function (req, res, next) {
	const { password } = req.body; 

	if(!validator.isStrongPassword(password)){
		res.locals.passwordInvalid = "Password should include 1 uppercase, 1 number, 1 special characters."
	}
    next();
  },
  validateEmail: function (req, res, next) {
	const { email } = req.body;

	if(!validator.isEmail(email)){
		res.locals.emailInvalid = "Please enter valid email."
	}

    next();
  },
};
