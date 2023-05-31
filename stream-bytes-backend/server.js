const express = require('express');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const app = express();
const port = 4000;
// const dbPort = 'mongodb://localhost/';
// const dbCollection = 'streambytes-dev';
const dbName = 'mongodb://localhost/streambytes-dev';

const videoModel = require('./models/videoModel');
const commentModel = require('./models/commentModel');
const userModel = require('./models/userModel');

const videoRoute = require('./routes/videoRoutes');
const userRouter = require('./routes/userRoutes');

const imagesLocation = path.join(__dirname, "images");



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

app.use(express.static(path.join(__dirname,)))

/**establish connection to mongodb */
async function connectDB() {
    await mongoose.connect(`${dbName}`, {
        useNewUrlParser: true, useUnifiedTopology: true,
    })
}

/** send video data to frontend 
 * rewrite user model to include a seperate field fro commment id
*/
app.get("/", async (req, res) => {
    let videos = [];
    videos = await videoModel.find().sort({ location: 'asc' });
    // res.json(videos);
    const token = jwt.sign({ uid: 'someUser' }, "69420");
    console.log("created and signed token is", token);
    const decodedToken = jwt.verify(token, '69420');
    console.log("decoded token is ", decodedToken);
    // res.json(token,videos);
    res.status(200).json(videos);
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
    try {
        const formData = req.body;
        console.log("form data recieveed from the request is:", formData);
        const videoId = req.params.id;
        console.log('video Id recieved from the request is ', videoId);
        const uId = '6437bc24386d373c9eed1d3a'
        const findUser = await userModel.findOne({ _id: uId })
        if (!findUser) {
            console.log('error occurued when trying to find user by reference to add new comment', err);
            throw new Error;
        }
        else {
            var comment = new commentModel({
                text: formData.commentText,
                author: findUser.userName,
                video: videoId
            });
            // console.log(comment)
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
                    res.status(500).json("There was an error adding comment to video");
                    throw new Error;
                }
            });
        }
    }
    catch (error) {
        console.log("Error occured when trying to add comment to video", error);
    }

});

app.listen(port, () => console.log(`running on port ${port}`));
connectDB();