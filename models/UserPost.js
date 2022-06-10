const mongoose = require('mongoose')

const UserPost = new mongoose.Schema({
    title: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String},
    likes: {type: Number, required: true},
    comments: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    likers: [{type: mongoose.Types.ObjectId, default: []}],
    user: {type: String, required: true},
})

module.exports = mongoose.model('UserPost', UserPost)
