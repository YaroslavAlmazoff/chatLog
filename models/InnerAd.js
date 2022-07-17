const mongoose = require('mongoose')

const InnerAd = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String},
    imageUrl: {type: String},
    link: {type: String, required: true},
    date: {type: String, required: true},
    active: {type: Boolean, required: true}
})

module.exports = mongoose.model('InnerAd', InnerAd)