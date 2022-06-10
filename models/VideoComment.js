const mongoose = require('mongoose')

const VideoComment = new mongoose.Schema({
    comment: {type: String, required: true},
    date: {type: String, required: true},
    videoUrl: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('VideoComment', VideoComment)