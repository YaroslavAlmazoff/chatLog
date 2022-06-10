const mongoose = require('mongoose')

const Article = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: String, required: true},
    image: {type: String},
    likes: {type: Number, required: true},
    comments: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    category: {type: String},
    user: {type: String},
})

module.exports = mongoose.model('Article', Article)
