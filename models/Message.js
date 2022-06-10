const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    message: {type: String, required: true},
    name: {type: String, required: true},
    avatarUrl: {type: String, required: true},
    date: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId},
    to: {type: mongoose.Types.ObjectId},
    room: {type: mongoose.Types.ObjectId, required: true},
    isNotReaded: {type: Boolean, required: true, default: true},
    id: {type: Number, required: true, default: 0},
    imageUrl: {type: String, default: ''},
})

module.exports = mongoose.model('Message', Message)