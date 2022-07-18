const mongoose = require('mongoose')

const InnerAd = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ''},
    imageUrl: {type: String},
    link: {type: String},
    date: {type: String, required: true},
    active: {type: Boolean, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    views: {type: Number, default: 0},
    clicks: {type: Number, default: 0}
})

module.exports = mongoose.model('InnerAd', InnerAd)