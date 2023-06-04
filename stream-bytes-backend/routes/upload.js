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
            cb(null, Date.now() + '-' + file.originalname)
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype !== 'H264') {
                // pass
            }
        }
    });


const upload = multer({ storage: storeVideo });

module.exports = upload;