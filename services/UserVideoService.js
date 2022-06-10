const uuid = require('uuid')
const UserVideo = require('../models/UserVideo')
const FileService = require('./FileService')
const ImageService = require('./ImageService')
const NewsService = require('./NewsService')
const path = require('path')
const User = require('../models/User')


class UserVideoService {
    async uploadVideo(req, res) {
        console.log(req.files.file.mimetype)
        const {title, date, likes, comments} = req.body
        const userid = req.user.userId
        const user = await User.findById(userid)
        const friends = user.friends
        //Генерирование нового имени для файла изображения поста
        const filename = uuid.v4() + '.mp4'
        //Создание нового поста в базе данных
        UserVideo.create({
            title, date, likes, comments, imageUrl: filename, user: userid
        }).then(() => {
            //Когда новый пост создался в базе данных, получение ID поста и загрузка изображения на диск
            UserVideo.findOne({date}).then((newValue) => {
                const id = newValue._id
                friends.forEach(el => {
                    NewsService.setNews(id, el)
                })
                FileService.insertUserVideo(req.files.file, id, filename)
                res.json({id})
            })
        })
    }
    async receiveVideo(req, res) {
        const id = req.params.id
        const videos = await UserVideo.find({user: id})
        res.json({videos})
    }
    async receiveOneVideo(req, res) {
        const id = req.params.id
        const video = await UserVideo.findById(id)
        res.json({video})
    }
    async delete(req, res) {
        const id = req.params.id
        const video = await UserVideo.findById(id)
        const src = video.imageUrl
        const filepath = path.resolve('..', 'static', 'uservideos', src)
        ImageService.deleteFile(filepath)
        await UserVideo.findByIdAndDelete(id)
        res.json({message: 'success'})
    }
}

module.exports = new UserVideoService()