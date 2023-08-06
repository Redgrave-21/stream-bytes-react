const multer = require('multer');
/**
 * video upload function
 * 
 */
const storeVideo =
    multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'videos');
        },
        filename: function (req, file, cb) {
            videoTitle = req.body.videoTitle.trim().replaceAll(" ",".")
            cb(null,`${videoTitle}.mp4`)
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'H264') {
                // pass
            }
        }
    });

const upload = multer({ storage: storeVideo });


/**upload movie */
const storeMovie =
     multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'movies');
        },
        filename: function (req, file, cb) {
            movieTitle = req.body.movieTitle.trim().replaceAll(" ",".")
            cb(null,`${movieTitle}.mp4`)
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'H264') {
                // pass
            }
        }
    });

const movieUpload = multer({ storage: storeMovie });

module.exports = {upload,movieUpload};