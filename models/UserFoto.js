const mongoose = require('mongoose')

const UserFoto = new mongoose.Schema({
    date: {type: String, required: true},
    likes: {type: Number, required: true, default: 0},
    comments: {type: Number, required: true, default: 0},
    imageUrl: {type: String, required: true},
    user: {type: String, required: true},
    likers: [{type: String, default: []}]
})

module.exports = mongoose.model('UserFoto', UserFoto)
