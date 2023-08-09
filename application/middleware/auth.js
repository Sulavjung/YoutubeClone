module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.redirectTo = req.originalUrl; 
      req.flash("error", "User must be logged in.");
      req.session.save(function (err) {
        if (err) next(err);
        res.redirect("/login");
      });
    }
  },
  isCurrentUserProfile: function(req, res, next){
    if(req.session.user.userId == req.params.id){
      res.locals.isCurrentUserProfile = true;
      next()
    } else {
      res.locals.isCurrentUSerProfile = false;
      next()
    }
  }, 
  isLoggedInJSON: function (req, res, next){
    if (req.session.user) {
      next();
    } else {
      req.flash("error", "User must be logged in.");
      return req.session.save(function (err) {
        if (err) next(err);
         return res.status(401).json({
          status: "failed",
          statusCode: -1,
          message: "Must be logged in to create a comment.", 
          redirectTo: "/login"
        })
      });
    }
  }
};
