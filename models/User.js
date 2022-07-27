const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    age: {type: String},
    email: {type: String, required: true},
    country: {type: String, default: ''},
    city: {type: String, default: ''},
    password: {type: String, required: true},
    avatarUrl: {type: String, default: 'user.png'},
    bannerUrl: {type: String, default: 'banner.jpg'},
    aboutMe: {type: String, default: ''},
    friends: [{type: mongoose.Types.ObjectId, default: []}],
    articles: [{type: mongoose.Types.ObjectId, default: []}],
    fotos: [{type: mongoose.Types.ObjectId, default: []}],
    subscribes: [{type: mongoose.Types.ObjectId, default: []}],
    news: [{type: mongoose.Types.ObjectId, default: []}],
    videohostCategories: [{type: String, default: []}]
})

module.exports = mongoose.model('User', User)
