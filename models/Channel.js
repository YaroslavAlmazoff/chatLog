const mongoose = require('mongoose')

const Channel = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, default: ''},
    subscribers: [{type: mongoose.Types.ObjectId, default: []}],
    category: {type: String},
    avatarUrl: {type: String},
    bannerUrl: {type: String},
    admin: {type: mongoose.Types.ObjectId},
    date: {type: String, required: true}
})

module.exports = mongoose.model('Channel', Channel)