const mongoose = require('mongoose')

const FotoComment = new mongoose.Schema({
    comment: {type: String, required: true},
    date: {type: String, required: true},
    fotoUrl: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true}
})

module.exports = mongoose.model('FotoComment', FotoComment)