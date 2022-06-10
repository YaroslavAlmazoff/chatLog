const mongoose = require('mongoose')

const File = new mongoose.Schema({
    name: {type: String, required: true},
    ext: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: Number, required: true},
    owner: {type: mongoose.Types.ObjectId, required: true},
    public: {type: Boolean, required: true}
})

module.exports = mongoose.model('File', File)
