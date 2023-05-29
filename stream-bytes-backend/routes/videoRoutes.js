const express = require('express');
const videoRouter = express.Router();
const fs = require('fs');

const videoModel = require('../models/videoModel');
const commentModel = require('../models/commentModel');

/** watch video */
videoRouter.get('/watch/:id', async (req, res) => {
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

/** send video information for player page*/
videoRouter.get('/video/:id/data', async (req, res) => {
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
videoRouter.get('/video/:id/comments', async (req, res) => {
    try {
        console.log("video id from comments route", req.params.id);
        commentsOfVideo = await videoModel.findById(req.params.id).populate('comments');
        res.json(commentsOfVideo);
    }
    catch (e) {
        console.log("error from fetch comment function", e);

    }
})

module.exports = videoRouter;