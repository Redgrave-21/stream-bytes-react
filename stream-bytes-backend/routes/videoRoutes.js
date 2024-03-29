const express = require('express');
const router = express.Router();
const fs = require('fs');

const videoModel = require('../models/videoModel');
const commentModel = require('../models/commentModel');
const verifyToken = require('./verifyToken');
const mongoose = require('mongoose');


/** watch video */
router.get('/watch/:id', async (req, res) => {
    try {
        // console.log("video id is", req.params.id);
        const videoToPlay = await videoModel.findByIdAndUpdate(req.params.id);
        const videoLocation = videoToPlay.location;

        const stat = fs.statSync(videoLocation);
        const fileSize = stat.size;
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
    catch (error) {
        console.log(error);
    }
})



/** send video information for player page*/
router.get('/video/:id/data', async (req, res) => {
    // if(verifyToken(req.cookies.access_token)){
    try {
        console.log("id from send video information ", req.params.id)
        const videoData = await videoModel.findById(req.params.id).populate('author');
        // res.json({ staus: 200, vidoData: videoData });
        res.status(200).json({videoData:videoData});
    }
    catch (err) {
        console.log("error from send video information function", err);
        res.status(404).json("Not Found");
    }
    // }
})

/** populate video comments */
router.get('/video/:id/comments', async (req, res) => {
    try {
        console.log("video id from comments route", req.params.id);
        fetchComments = await videoModel.findById(req.params.id).populate('comments')
        comments = await fetchComments.populate('author');
        console.log(comments)
        // res.json(commentsOfVideo);
        res.status(200).json({comments});
    }
    catch (error) {
        console.log("error from fetch comment function", error);
        res.status(400).json("Not Found");
    }
})


/** update existing video details */
router.post('/video/:id/update', async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body.data
        const videoID = new mongoose.Types.ObjectId(req.params.id)
        if(data.videoTitle && data.description){
            const newTitle = data.videoTitle
            const updatedDescription = data.description
            const updatedVideo = await videoModel.findOneAndUpdate({ _id: videoID }, { $set: { title: newTitle, description: newDescription } }, { new: true });
            await updatedVideo.save();
        }
        else if(data.videoTitle){
            const newTitle= data.videoTitle
            const updatedVideo = await videoModel.findOneAndUpdate({ _id: videoID }, { $set: { title: newTitle} }, { new: true });
            await updatedVideo.save();
        }
        else if(data.description){
            const newDescription = data.description
            const updatedVideo = await videoModel.findOneAndUpdate({ _id: videoID }, { $set: { description: newDescription } }, { new: true });
            await updatedVideo.save();
        }
        // console.log(videoID);
        // const updatedVideo = await videoModel.findOneAndUpdate({ _id: videoID }, { $set: { title: data.videoTitle, description: data.videoDescription } }, { new: true });
        // console.log(updatedVideo)
    }
    catch (e) {
        console.log("error occured when trying to update a video", e);
    }
})

module.exports = router;