const mongoose = require('mongoose')

const Support = new mongoose.Schema({
    text: {type: String, required: true}
})

module.exports = mongoose.model('Support', Support)
