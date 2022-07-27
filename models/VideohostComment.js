const mongoose = require('mongoose')

const VideohostComment = new mongoose.Schema({
    text: {type: String, required: true},
    date: {type: String, required: true},
    videoID: {type: mongoose.Types.ObjectId, required: true},
    user: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('VideohostComment', VideohostComment)
