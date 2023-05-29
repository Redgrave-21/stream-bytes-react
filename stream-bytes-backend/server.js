const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

const videoModel = require('./models/videoModel');
const commentModel = require('./models/commentModel');

/** allow cors */
app.use(cors({
    origin: '*',
    credentials: false
}))

/**enable bodyParser */
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

const imagesLocation = path.join(__dirname, "images");

app.use(express.static(path.join(__dirname,)))

/**establish connection to mongodb */
try {
    // mongoose.connect('mongodb://localhost/streambytes-dev', {
    mongoose.connect('mongodb://localhost/streambytes-dev', {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
}
catch (error) {
    console.log(error);
    console.log('maybe the default port is already occupied');
}


/** send video data to frontend */
app.get("/", async (req, res) => {
    let videos = [];
    videos = await videoModel.find().sort({ location: 'asc' });
    res.json(videos);
    // console.log('/ pinged');
})

/** send image to frontend */
app.get('/sendimage/:imgName', async (req, res) => {
    const imageName = req.params.imgName;
    // console.log("image name is ", req.params.imgName);
    const imageToSend = `${imagesLocation}/${imageName}`;
    res.sendFile(imageToSend);
});

/** send video information for player page*/
app.get('/video/:id/data', async (req, res) => {
    try {
        console.log("id from send video information ", req.params.id)
        const videoData = await videoModel.findById(req.params.id);
        // res.json({ staus: 200, vidoData: videoData });
        res.json(videoData)
    }
    catch (e) {
        console.log("error from send video information function", e)
    }
})

/** populate video comments */
app.get('/video/:id/comments', async (req, res) => {
    try {
        console.log("video id from comments route", req.params.id);
        commentsOfVideo = await videoModel.findById(req.params.id).populate('comments');
        res.json(commentsOfVideo);
    }
    catch (e) {
        console.log("error from fetch comment function", e);

    }
})

/** watch video */
app.get('/watch/:id', async (req, res) => {
    try {
        // console.log("video id is", req.params.id);
        const videoToPlay = await videoModel.findByIdAndUpdate(req.params.id)//newly added
        const videoLocation = videoToPlay.location;

        const stat = fs.statSync(videoLocation)
        const fileSize = stat.size
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(videoLocation, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);

            /**increment views count on closing the file */
            file.on('close', () => {
                console.log('file is closed')
                videoModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } }).exec();
            })
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
        }
    }
    catch (e) {
        console.log(e);
    }


})

/** add comment to a video
 * add authentication to this route later
 */
app.post('/video/:id/comments', async (req, res) => {
    const formData = req.body;
    console.log("form data recieveed from the request is:", formData);
    const videoId = req.params.id;
    console.log('video Id recieved from the request is ', videoId)
    const uId = '6437bc24386d373c9eed1d3a'
    console.log(uId)
    try {
        // userModel.findOne({ _id: uId }, async (err, User) => {
        // if (err) {
        //     console.log('error occurued when trying to find user by reference to add new comment', err);
        // }
        // else {
        var comment = new commentModel({
            text: formData.commentText,
            author: uId,
            video: videoId
        });
        // console.log(comment)
        await comment.save()
        const videoForComment = await videoModel.findById(videoId);
        videoForComment.comments.push(comment);
        await videoForComment.save(), (err, out) => {
            if (err) {
                console.log(err)
            }
            else if (out) {
                console.log(out)
            }
            else {
                res.json({ status: 200, text: 'comment added to video' })
            }
        }
        // }    
        // });
    }
    catch (err) {
        console.log('error has occured', err)
    }
})

app.listen(port, () => console.log(`running on port ${port}`))