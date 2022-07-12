const Photo = require("../models/Photo")
const User = require("../models/User")
const uuid = require('uuid')
const FileService = require("./FileService")

class PhotoService {
    async create(req, res) {
        const authorId = req.params.id
        const author = await User.findById(authorId)
        const {title, description, place, time, params, date} = req.body
        const name = uuid.v4() + '.jpg'
        await Photo.create({
            title, description, place, 
            time, params, authorId, name, date, likes: 0, 
            authorName: author.name, authorSurname: author.surname
        })
        FileService.insertPhoto(req.files.photo, name)
        res.json({msg: 'success'})
    }
    async photo(req, res) {
        const photo = await Photo.findById(req.params.id)
        res.json({photo})
    }
    async new(req, res) {
        const all = await Photo.find({})
        console.log(req.body.date)
        if(!all.length) {
            res.json('печально') 
            return
        }
        const need = all.filter(photo => {
            console.log(photo, 
                photo.date, 
                photo.date.split('.'),
                photo.date.split('.')[0],
                photo.date.split('.')[0] === req.body.date,
                req.body.date)
            return photo.date.split('.')[0] === req.body.date
        })
        res.json({photos: need})
    }
    async popular(req, res) {
        const all = await Photo.find({})
        if(!all.length) {
            res.json('печально') 
            return
        }
        const need = all.filter(photo => photo.likes >= 5)
        res.json({photos: need})
    }
    async all(req, res) {
        const photos = await Photo.find({})
        res.json({photos})
    }
    async getLikes(req, res) {
        const photo = await Photo.findById(req.params.id)
        res.json({likes: photo.likes})
    }
    async setLikes(req, res) {
        await Photo.findByIdAndUpdate(req.params.id, {likes: req.body.likes})
        res.json({msg: 'success'})
    }
}

module.exports = new PhotoService()