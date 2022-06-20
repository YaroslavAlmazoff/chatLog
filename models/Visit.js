const mongoose = require('mongoose')

const Visit = new mongoose.Schema({
    text: {type: String, default: ''}
})

module.exports = mongoose.model('Visit', Visit)
