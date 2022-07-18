const mongoose = require('mongoose')

const InnerAd = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, default: ''},
    imageUrl: {type: String},
    link: {type: String},
    date: {type: String, required: true},
    active: {type: Boolean, required: true}
})

module.exports = mongoose.model('InnerAd', InnerAd)