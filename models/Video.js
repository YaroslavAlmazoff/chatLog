const mongoose = require('mongoose')

const Video = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    date: {type: String, required: true},
    previewUrl: {type: String},
    videoUrl: {type: String, required: true},
    likes: {type: Number, default: 0},
    views: {type: Number, default: 0},
    comments: {type: Number, default: 0},
    category: {type: String, default: ''},
    channel: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('Video', Video)