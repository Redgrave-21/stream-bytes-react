const express = require('express');
const router = express.Router();
const upload = require('./upload');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const fs = require('fs');
const simpleThumbnail = require('simple-thumbnail');
const isAuthenticated = require('./verifySession');

// contains jwt authentication
//below import is required only for signup
const auth = require('../auth/auth');

const userModel = require('../models/userModel');
const videoModel = require('../models/videoModel');
const commentModel = require('../models/commentModel');


// get user data
router.get('/user/home', isAuthenticated, async (req, res) => {
    try {
        // console.log(req.session.UID);
        // UID = "6437bc24386d373c9eed1d3a"
        // console.log("id fetched from  request is ", req.params.UID);
        // UID = req.params.id
        // console.log("uid from req is ", UID);
        const UID = req.session.UID;
        console.log("id fetched from session is", req.session.UID);
        // console.log("user id fetched from req object",req.uid)
        let currentUser = await userModel.findOne({ _id: UID }).populate('videos').populate('playlist');
        if (currentUser) {
            console.log(currentUser);
            console.log(currentUser.userName)
            res.status(200).json(currentUser)
        }
        console.log("id is not defined");
        res.status(500).status("request id is not defined");
    }
    catch (e) {
        console.log("error from home route", e);
    }

})

/**new user signup */
router.post('/user/signup', async (req, res) => {
    try {
        console.log(req.body);
        const formData = req.body.formData;
        console.log(formData);
        // let { emailId, userName, password1 } : {req.body.emailId, req.body.userName};
        const formEmailId = formData.emailID.toLowerCase();
        const formUserName = formData.userName;
        const formPassword1 = formData.password1;
        console.log('data obtained from form is ', formEmailId, formUserName, formPassword1);
        const existingUser = await userModel.findOne({ emailId: formEmailId })
        if (existingUser) {
            console.log("output of findOne", existingUser)
            console.log(existingUser.userName)
            res.status(200).json("user with that mail already exists");
        }
        else {
            await userModel.create({
                userName: formUserName,
                emailId: formEmailId,
                password: bcrypt.hashSync(password, 3)
            }).then((resolved, rejected) => {
                if (resolved) {
                    res.status(200).json("user Created success fully");
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
router.post('/video/:id/comments', isAuthenticated, async (req, res) => {
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
router.post('/user/upload', isAuthenticated, upload.single('file'), async (req, res, next) => {
    try {
        console.log("form body is ", req.body)
        console.log(req.file);
        next();
    }
    catch (err) {
        console.log("Error occured when trying to add comment to video", err);

    }
}, saveVideo()
);


function saveVideo() {
    return async (req, res) => {
        const formData = req.body;
        const file = req.file;
        console.log("file recieved from request is", file)
        console.log(formData.title, formData.description);
        // const uid = '6437bc24386d373c9eed1d3a';
        const userID = res.session.UID;
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
                title: formData.title,
                description: formData.description,
                author: User.userName,
                location: `./videos/${file.filename}`,
                thumbLocation: `${thumbName}.png`,
                date: Date
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
router.post("/report/:id", async(req,res)=>{
    console.log(req.body);
    res.status(200).json("report Pinged");
})

module.exports = router;