var mongoose = require('mongoose');

//Define Collection Schema
const userSchema = new mongoose.Schema({
    emailId:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    role:{
        type: String,
        required: true,
        default: "user"
    },
    
    playlist:[{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "vidmodel"
    }],

    likes:[{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "vidmodel"
    }],

    dislikes:[{
        type:  String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "vidmodel"
    }],
    videos:[{
        type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "vidmodel"
    }]
})

userSchema.pre('save', function(next) {
    this.emailId=this.emailId.toLowerCase();
    next();
})

module.exports = mongoose.model('usermodel', userSchema)