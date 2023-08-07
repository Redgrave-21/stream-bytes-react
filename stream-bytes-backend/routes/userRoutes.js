const express = require('express');
const router = express.Router();
const { upload } = require('./upload');
const { movieUpload } = require('./upload')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const fs = require('fs');
const simpleThumbnail = require('simple-thumbnail');
const PDFDocument = require('pdfkit')
// const isAuthenticated = require('./verifySession');

// contains jwt authentication
//below import is required only for signup
const auth = require('../auth/auth');

const userModel = require('../models/userModel');
const videoModel = require('../models/videoModel');
const commentModel = require('../models/commentModel');
const { verify } = require('crypto');
const movieModel = require('../models/movieModel');



// get user data
router.get('/user/home', verifyToken, async (req, res) => {
    try {
        // console.log(req.session.UID);
        // UID = "6437bc24386d373c9eed1d3a"
        // console.log("id fetched from  request is ", req.params.UID);
        // UID = req.params.id
        // console.log("uid from req is ", UID);
        // const UID = decodedToken.UID;
        console.log("id fetched from session is", res.locals.decodedToken);
        const UID = res.locals.decodedToken.UID;
        let currentUser = await userModel.findOne({ _id: UID }).populate('videos').populate('playlist');
        if (currentUser) {
            // console.log(currentUser);
            // console.log(currentUser.userName)
            return res.status(200).json(currentUser)
        }
        // console.log("id is not defined");
        return res.status(500).json("user with UID does not exist");
    }
    catch (e) {
        console.log("error from home route", e);
    }

})

/**new Admin signup */
router.post('/admin/signup', async (req, res) => {
    try {
        const formData = req.body;
        console.log(formData);
        // let { emailId, userName, password1 } : {req.body.emailId, req.body.userName};
        const formEmailId = formData.emailId.toLowerCase();
        const formUserName = formData.username;
        const formPassword1 = formData.password;
        console.log('data obtained from form is ', formEmailId, formUserName, formPassword1);
        const existingUser = await userModel.findOne({ emailId: formEmailId })
        // const existingUser = await userModel.findAll({ role: 'admin' })
        console.log(existingUser)
        if (existingUser) {
            console.log("output of findOne", existingUser)
            console.log(existingUser.userName)
            res.status(200).json("user with that mail already exists");
        }
        else {
            await userModel.create({
                userName: formUserName,
                emailId: formEmailId,
                password: bcrypt.hashSync(formPassword1, 3)
            }).then((resolved, rejected) => {
                if (resolved) {
                    res.status(200).json("user Created successfully");
                    console.log('user created')
                }
                else if (rejected) {
                    res.status(500).json("Internal server error");
                }
            })

        }
    }
    catch (err) {
        console.log("Error occrured when saving the document", err);
        res.status(500).json("Internal server error");
    }
});

/** add comment to a video
 * add authentication to this route later
 */
router.post('/video/:id/comments', verifyToken, async (req, res) => {
    try {
        const formData = req.body;
        // console.log("form data recieved from the request is:", formData);
        const videoId = req.params.id;
        // console.log('video Id recieved from the request is ', videoId);
        const uId = req.session.UID;
        const foundUser = await userModel.findOne({ _id: uId }).exec();
        if (!foundUser) {
            console.log('error occurued when trying to find user by reference to add new comment');
            res.status(401).json("you must be logged in to use this feature")
        }
        else {
            var comment = new commentModel({
                text: formData.commentText,
                author: foundUser.userName,
                video: videoId
            });
            await comment.save()
            const videoForComment = await videoModel.findById(videoId);
            videoForComment.comments.push(comment);
            await videoForComment.save().then((fulflled, rejected) => {
                if (fulflled) {
                    console.log("comment added to video");
                    res.status(200).json("comment added to Video");
                }
                else if (rejected) {
                    console.log("comment could not be added to video");
                    res.status(500).json("internal server error");
                }
            });
        }
    }
    // else {
    //     res.status(400).json("you must be logged in to access this feature");
    // }
    catch (error) {
        console.log("Error occured when trying to add comment to video", error);
    }
    // }
});

// upload new video
router.post('/user/upload', verifyToken, upload.single('file'), async (req, res, next) => {
    try {
        console.log("form body is ", req.body)
        console.log(req.file);
        next();
    }
    catch (err) {
        console.log("Error occured when trying to upload video", err);
    }
},
    saveVideo()
);

// fs.watch('./movies/', {}, async (eventType, filename) => {
//     if (eventType === 'change') {
//         console.log(filename)
//         let movie = new movieModel({
//             title: filename,
//             // author: 'admin',
//             location:`./movies/${filename}`,
//             description:"some movie"
//         })
//         await movie.save();
//     }
// })

// upload movie
router.post('/user/upload-movie', verifyToken, movieUpload.single('file'), async (req, res, next) => {
    try {
        console.log("form body is ", req.body)
        console.log(req.file);
        next();
    }
    catch (err) {
        console.log("Error occured when trying to upload movie", err);

    }
},
    saveMovie()
);

function saveVideo() {
    return async (req, res) => {
        console.log(req.body)
        const formData = req.body;
        const file = req.file;
        console.log("file recieved from request is", req.file)
        console.log(formData.videoTitle, formData.videoDescription);
        // const uid = '6437bc24386d373c9eed1d3a';
        const userID = res.locals.decodedToken.UID;
        console.log(userID)
        const User = await userModel.findOne({ _id: userID });
        console.log("found user is", User);
        location = `./videos/${file.filename}`     //set video location with filename
        // console.log(newVideo.location)
        let thumbName = location
        thumbName = thumbName.split("/")
        console.log("newly generated thumbnail".thumbName)

        try {
            thumbName = thumbName.toString().replace('.,videos,', "")
            // console.log("Output of video model location", newVideo.location)
            await simpleThumbnail(`${location}`, `./images/${thumbName}.png`, '600x?', { seek: '00:00:14.00' })
            console.log("thumb generated")
            thumbName = thumbName.toString().replace('.,videos,', "")
            console.log("value of thumbName before save", thumbName)
            // newVideo.thumbLocation = `${thumbName}.png`


            //save video
            let newVideo = new videoModel({
                title: formData.videoTitle,
                description: formData.videoDescription,
                author: User._id,
                location: `./videos/${file.filename}`,
                thumbLocation: `${thumbName}.png`,
                date: Date.now()
            }
            )
            newVideo = await newVideo.save()
            console.log('video saved successfully')
            res.send('video saved')
            console.log(newVideo._id)
            User.videos.push(newVideo)
            await User.save()
            // videoAuthor.push(newVideo._id)
            // console.log(videoAuthor._id);
            // convertCodec(newVideo._id);
        } catch (e) {
            console.log("error has occured when saving the video", e)
        }

    }
}

function saveMovie() {
    return async (req, res) => {
        const formData = req.body;
        console.log("file recieved from request is", req.file)
        console.log(formData.movieTitle, formData.movieYear);
        const userID = res.locals.decodedToken.UID;
        console.log(userID)
        const User = await userModel.findOne({ _id: userID });
        // console.log("found user is", User);
        movieTitle = formData.movieTitle.replaceAll(" ", ".")
        movieYear = formData.movieYear
        movieDescription = formData.movieDescription
        location = `./movies/${movieTitle}.mp4`
        let thumbName = location
        thumbName = thumbName.split("/")
        console.log("newly generated thumbnail", thumbName)
        console.log(movieTitle, movieYear, movieDescription)
        try {
            //save movie
            let newMovie = new movieModel({
                title: formData.movieTitle,
                description: movieDescription,
                Year: formData.movieYear,
                author: User._id,
                location: `./videos/${movieTitle}.mp4`,
                thumbLocation: `./images/broken.png`,
                date: Date.now()
            })
            await newMovie.save()
            console.log('movie saved successfully')
            res.send('Movie saved')
            console.log(newMovie._id)
            // User.videos.push(newVideo)
            // await User.save()
            // videoAuthor.push(newVideo._id)
            // console.log(videoAuthor._id);
            // convertCodec(newVideo._id);
        } catch (e) {
            console.log("error has occured when saving the video", e)
        }

    }
}

// keep this for future scope
function convertCodec(fileid) {
    hbjs.spawn({ input: `${fileid.location}`, output: `${fileid.location}` }).on(
        'error', err => {
            //invalid input
            console.log(err);
        }
    ).on('progress', progress => {
        console.log(
            'percent complete: %s, ETA: %s',
            progress.percentComplete,
            progress.eta
        )
    })
}

// Report content
router.post("/report/:id", verifyToken, async (req, res) => {
    console.log("report pinged");
    // const user = userMode.findOne()
    res.status(200).json("report Pinged");
})

// fetch account data
router.post('/user/:id/data', verifyToken, async (req, res) => {
    const userID = req.params.id
    const foundUser = await userModel.findOne({ _id: userID })
    console.log(foundUser)
})

// upload profile picture
router.post('/user/:id/update/profile/picute', async (req, res) => {
    const data = req.body
    console.log(data)
})

// change username
router.post('/user/:id/update-username', verifyToken, async (req, res) => {
    console.log('user to update is', req.params.id)
    console.log('user to update is', req.body)
    const UID = req.params.id
    const newUsername = req.body.data.username
    const updatedUser = await userModel.findOneAndUpdate({ _id: UID }, { $set: { userName: newUsername } }, { new: true })
    await updatedUser.save()
    return res.status(200).json("username changed successfully")
})


// generate reports
router.post('/user/report', verifyToken, async (req, res) => {
    // const UID = req.params.id
    const UID = res.locals.decodedToken.UID
    console.log(UID)
    const data = await userModel.findById(UID).populate({
        path: 'videos', populate: [
            { path: 'likes' },
            { path: 'dislikes' }
        ]
    })
    await generatePDFReport(data)

    // return res.status(200).json({ "report": report })
})

//generateReportFunction
function generatePDFReport(data) {
    console.log("pdf report triggerd")
    const reportDocument = new PDFDocument();
    const stream = fs.createWriteStream('report.pdf')
    // Add title to the report
    reportDocument.fontSize(24).text('User Report', { align: 'center' });
    reportDocument.moveDown(0.5); // Move down half an inch

    // Add user information to the report
    reportDocument.fontSize(18).text('User Information:', { underline: true });
    reportDocument.fontSize(14).text(`Email ID: ${data.emailId}`);
    reportDocument.fontSize(14).text(`Username: ${data.userName}`);
    reportDocument.fontSize(14).text(`Role: ${data.role}`);

    // Add videos information to the report
    reportDocument.moveDown(0.5); // Move down half an inch
    reportDocument.fontSize(18).text('Videos:', { underline: true });

    // Create a table to display videos information
    const table = {
        headers: ['Title', 'Description', 'Location', 'Author', 'Views'],
        rows: [],
    };
    function drawTable(doc, table, startX, startY) {
        const columnCount = table.headers.length;
        const columnWidth = 100;
        const rowHeight = 30;
        const headers = table.headers;
        const rows = table.rows;

        doc.font('Helvetica-Bold');
        doc.fontSize(12);

        let currentY = startY;

        // Draw headers
        for (let i = 0; i < columnCount; i++) {
            doc.fillColor('black').text(headers[i], startX + i * columnWidth, currentY, {
                width: columnWidth,
                align: 'left',
            });
        }
        currentY += rowHeight;

        // Draw rows
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (let j = 0; j < columnCount; j++) {
                doc.fillColor('black').text(row[j], startX + j * columnWidth, currentY, {
                    width: columnWidth,
                    align: 'left',
                });
            }
            currentY += rowHeight;
        }

        return currentY;
    }

    data.videos.forEach((video) => {
        const row = [
            video.title,
            video.description,
            video.location,
            video.author,
            video.views,
        ];
        table.rows.push(row);
    });

    // Set column widths and draw the table
    const columnWidths = [150, 200, 150, 150, 50];
    drawTable(reportDocument, table, 100, 200);
    reportDocument.end(() => {
        console.log('Report generated successfully.');
        stream.end()
        resolve()
    }); // Finalize the PDF document
    // console.log(data)

}

module.exports = router;