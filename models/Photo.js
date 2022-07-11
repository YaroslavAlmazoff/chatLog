const mongoose = require('mongoose')

const Photo = new mongoose.Schema({
    name: {type: String, required: true},
    title: {type: String, required: true},
    date: {type: String, required: true},
    authorId: {type: mongoose.Types.ObjectId, required: true},
    authorName: {type: String, required: true},
    authorSurname: {type: String, required: true},
    description: {type: String},
    place: {type: String},
    time: {type: String},
    params: {type: String},
    likes: {type: Number},
})

module.exports = mongoose.model('Photo', Photo)
