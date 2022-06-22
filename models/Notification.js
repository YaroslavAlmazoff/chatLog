const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
    checked: {type: Boolean, required: true, deafult: false},
    title: {type: String, required: true},
    type: {type: String, required: true},
    from: {type: String},
    to: {type: mongoose.Types.ObjectId, required: true},
    postType: {type: String},
    postID: {type: String}
})

module.exports = mongoose.model('Notification', Notification)
