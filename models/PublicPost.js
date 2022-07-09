const mongoose = require('mongoose')

const PublicPost = new mongoose.Schema({
    text: {type: String, required: true},
    date: {type: String, required: true},
    likes: {type: Number, required: true},
    comments: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    likers: [{type: mongoose.Types.ObjectId, default: []}],
    public: {type: mongoose.Types.ObjectId, required: true},
})

module.exports = mongoose.model('PublicPost', PublicPost)
