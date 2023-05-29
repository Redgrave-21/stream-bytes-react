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

const videoRoute = require('./routes/videoRoutes');
const userRouter = require('./routes/userRoutes');

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

app.use(videoRoute);
app.use(userRouter);

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