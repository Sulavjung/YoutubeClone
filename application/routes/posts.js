var express = require("express");
const router = express.Router();
var multer = require("multer");
const { makeThumbnail, getPostByID, getCommentsByPostId, getRecentPosts } = require("../middleware/posts");
const { isLoggedIn } = require("../middleware/auth");
const db = require("../config/database");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/videos");
  },
  filename: function (req, file, cb) {
    const fileExt = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
  },
});

const upload = multer({ storage: storage });

//localhost:3000/posts/create
router.post(
  "/create",
  isLoggedIn,
  upload.single("uploadVideo"),
  makeThumbnail,
  async function (req, res, next) {
    var { title, description } = req.body;
    var { path, thumbnail } = req.file;
    var { userId } = req.session.user;

    try {
      var [insertResult, _] = await db.execute(
        "insert into posts (title, description, video, thumbnail, fk_userId) value (?, ?, ?, ?, ?);",
        [title, description, path, thumbnail, userId]
      );

      if (insertResult && insertResult.affectedRows) {
        req.flash("success", "Your post was created.");
        return req.session.save(function (err) {
          if (err) {
            next(err);
          }
          return res.redirect("/");
        });
      } else {
        req.flash(
          "error",
          "Your post could not be made, please try again later"
        );
        return req.session.save(function (err) {
          if (err) {
            next(err);
          }
          return res.redirect("/postvideo");
        });

      }
    } catch (err) {
      next(err);
    }
  }
);

//localhost:3000/posts/:id
router.get('/:id(\\d+)', getPostByID, getCommentsByPostId, getRecentPosts ,function(req, res, next) {
  res.render('viewpost', { title: res.locals.post.title , name:"Sulav Jung Hamal", js:["commentScript.js"]   });
});

//localhost:3000/posts/search?key=term
router.get('/search', getRecentPosts, async function(req, res, next){
  var {key} = req.query;
  const searchValue = `%${key}%`
  try{
    const [results, _] = await db.execute(
      `SELECT p.id, p.title, p.description, p.thumbnail, p.createdAt, u.id AS userId, u.username, CONCAT_WS(" ", p.title, p.description) AS haystack
      FROM posts p
      JOIN users u ON p.fk_userId = u.id
      HAVING haystack LIKE ?`,
      [searchValue]
    );    

    if(results && results.length > 0){
      res.locals.count = results.length;
      res.locals.searchResults = results;
      res.locals.searchKey = key;
      return res.render('index', {title: key});
    } else if(results && results.length == 0) {
      res.locals.count = results.length;
      res.locals.searchKey = key;
      return req.session.save(function (err) {
        if (err) {
          next(err);
        }
        return res.render('index', {title: key});
      });
    };
      
  } catch(err){
    next(err);
  }

})

module.exports = router;
