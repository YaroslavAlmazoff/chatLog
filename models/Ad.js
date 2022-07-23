const mongoose = require('mongoose')

const Ad = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    price: {type: Number},
    city: {type: String},
    phone: {type: String},
    images: [{type: String, default: ''}],
    date: {type: String, required: true},
    active: {type: Boolean, required: true},
    dieDate: {type: String, required: true},
    user: {type: mongoose.Types.ObjectId, required: true},
    views: {type: Number, default: 0},
    clicks: {type: Number, default: 0},
    category: {type: String, default: ''}
})

module.exports = mongoose.model('Ad', Ad)