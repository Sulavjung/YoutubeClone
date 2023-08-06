var pathToFFMPEG = require("ffmpeg-static");
var promisify = require('util').promisify;
var exec = promisify(require("child_process").exec);
var db = require('../config/database');
const { async } = require("regenerator-runtime");
module.exports = {
    makeThumbnail: async function (req, res, next) {
        if (!req.file) {
            next(new Error("File upload failed"));
        } else {
            try {
                var destinationOfThumbnail = `public/uploads/images/thumbnail-${req.file.filename.split(".")[0]}.png`;
                var thumbnailCommand = `"${pathToFFMPEG}" -ss 00:00:01 -i ${req.file.path} -y -s 480x270 -vframes 1 -f image2 ${destinationOfThumbnail}`;
                var { stdout, stderr } = await exec(thumbnailCommand);
                req.file.thumbnail = destinationOfThumbnail;
                next();
            } catch (error) {
                next(error);
            }
        }
    },
	getPostByID: async function (req, res, next){
		var {id} = req.params;
		try {
			const [results, _] = await db.execute(`SELECT p.id, p.title,p.description,p.video, p.createdAt, u.username
			FROM posts p
			JOIN users u
			ON fk_userId=u.id
			WHERE p.id =?`, [id]);
			
			const post = results[0];
			if(!post){
				req.flash("error", "This is not the post that you are looking for");
				return req.session.save(function(err){
					if(err){
						next(err)
					};
					return res.redirect("/");
				})
			} else{
				res.locals.post = post;
				next();
			}
		} catch(err){
			next(err);
		}
	}, 
	getRecentPosts: async function (req, res, next){
		try{
			const [results, _] = await db.execute(`SELECT p.id, p.title, p.description,p.thumbnail, p.video, p.createdAt,u.id AS userId, u.username
			FROM posts p
			JOIN users u ON p.fk_userId = u.id
			ORDER BY p.createdAt DESC
			LIMIT 20;
			`);

			if(results && results.length > 0){
				res.locals.results = results;
				next();
			} else {
				res.locals.results = [];
				next();
			}
		}catch(err){
			next(err);
		}
	}
}
