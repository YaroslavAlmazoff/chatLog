const mongoose = require('mongoose')

const Room = new mongoose.Schema({
    user1: {type: mongoose.Types.ObjectId, required: true},
    user2: {type: mongoose.Types.ObjectId, required: true},
    lastMessage: {type: String}
})

module.exports = mongoose.model('Room', Room)
