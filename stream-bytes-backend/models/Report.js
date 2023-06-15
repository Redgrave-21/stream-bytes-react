const mongoose = require('mongoose');

var report = new mongoose.Schema(
    {
        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'videModel'
        },
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel',
            required: true
        },
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'commentModel'
        },
        reason: {
            type: String,
            required: true
        }
    }
)