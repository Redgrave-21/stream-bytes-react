const mongoose = require('mongoose')

var commentSchema = new mongoose.Schema(
    {
        author: {
            type: String,
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },

        video: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vidModel'

        }

    }
)

module.exports = mongoose.model('comment', commentSchema)