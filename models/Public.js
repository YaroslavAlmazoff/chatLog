const mongoose = require('mongoose')

const Public = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    bannerUrl: {type: String, deafult: ''},
    avatarUrl: {type: String, default: ''},
    subscribers: [{type: mongoose.Types.ObjectId, default: []}],
    posts: [{type: mongoose.Types.ObjectId, default: []}],
    fotos: [{type: String, default: []}],
    admin: {typr: mongoose.Types.ObjectId, required: true},
})

module.exports = mongoose.model('Public', Public)
