var mongoose = require('mongoose');

//Define Collection Schema
const videoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    comments: [{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],

    thumbLocation: {
        type: String
    },

    likes: [{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    }],

    dislikes: [{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    }],

    date: {
        type: String,
    },

    views:{
        type: Number,
        default:0
    }
})

module.exports = mongoose.model('vidmodel', videoSchema)