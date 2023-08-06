module.exports = {
  isLoggedIn: function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash("error", "User must be logged in to create a post.");
      req.session.save(function (err) {
        if (err) next(err);
        res.redirect("/login");
      });
    }
  },
  isCurrentUserProfile: function(req, res, next){
    console.log(req.session.user.userId)
    if(req.session.user.userId == req.params.id){
      res.locals.isCurrentUserProfile = true;
      next()
    } else {
      res.locals.isCurrentUSerProfile = false;
      next()
    }
  }
};
