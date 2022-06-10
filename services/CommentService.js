const Comment = require('../models/Comment.js')
const FotoComment = require('../models/FotoComment')
const User = require('../models/User.js')
const UserFoto = require('../models/UserFoto.js')
const UserPost = require('../models/UserPost.js')
const UserVideo = require('../models/UserVideo')
const VideoComment = require('../models/VideoComment.js')
const NotificationService = require('./NotificationService.js')

//Сервис комментариев
class CommentService {
    //Отправка комментария
    async send(req, res) {
        try {
            //Получение данных пользователя из тела запроса
            const {comment, date, articleID} = req.body
            const user = req.user.userId
            const commenter = await User.findById(user)
            //Создание комментария в базе данных
            await Comment.create({
                comment, date, articleID, user
            })
            const post = await UserPost.findById(articleID)
            let comments =  post.comments
            comments = comments + 1
            await UserPost.findByIdAndUpdate(articleID, {comments})
            const text = `Вашу публикацию прокомментировал(а) ${commenter.name} ${commenter.surname}.`
            NotificationService.create(user, post.user, text, 'comment', 'article', articleID)
            res.json(req.body)
        } catch(e) {
            console.log(e)
        }
    }
    async commentFoto(req, res) {
        try {
            const {comment, date} = req.body
            const user = req.user.userId
            const commenter = await User.findById(user)
            console.log(commenter)
            const fotoUrl = req.params.url
            FotoComment.create({comment, date, fotoUrl, user})
            const foto = await UserFoto.findOne({imageUrl: fotoUrl})
            let comments = foto.comments
            comments = comments + 1
            await UserFoto.updateOne({imageUrl: fotoUrl}, {comments})
            const text = `Вашу публикацию прокомментировал(а) ${commenter.name} ${commenter.surname}.`
            NotificationService.create(user, foto.user, text, 'comment', 'fotography', fotoUrl)
            res.json({message: 'success!'})
        } catch(e) {
            console.log(e)
        }
    }
    async commentVideo(req, res) {
        try {
            console.log('here')
            const {comment, date} = req.body
            const user = req.user.userId
            const commenter = await User.findById(user)
            const videoUrl = req.params.url
            VideoComment.create({comment, date, videoUrl, user})
            const video = await UserVideo.findById(videoUrl)
            let comments = video.comments
            comments = comments + 1
            await UserVideo.findByIdAndUpdate(videoUrl, {comments})
            const text = `Вашу публикацию прокомментировал(а) ${commenter.name} ${commenter.surname}.`
            NotificationService.create(user, video.user, text, 'comment', 'video', videoUrl)
            res.json({message: 'success!'})
        } catch(e) {
            console.log(e)
        }
    }
    //Возвращение комментариев определённого поста
    async receive(req, res) {
        try {
            //Получение ID поста
            const id = req.params.id
            //Поиск комментариев
            const comments = await Comment.find({articleID: id})
            //Возвращение комментариев на клиент
            res.json({comments})
        } catch (e) {
            console.log(e) 
        }
    }
    async receiveFotoComments(req, res) {
        const comments = await FotoComment.find({fotoUrl: req.params.url})
        res.json({comments})
    }
    async receiveVideoComments(req, res) {
        const comments = await VideoComment.find({videoUrl: req.params.url})
        res.json({comments})
    }
    async deleteComment(req, res) {
        const id = req.params.id
        const url = req.params.url
        const post = await UserPost.findById(url)
        let comments =  post.comments
        comments = comments - 1
        await UserPost.findByIdAndUpdate(url, {comments})
        await Comment.findByIdAndDelete(id)
    }
    async deleteFotoComment(req, res) {
        const id = req.params.id
        const url = req.params.url
        const foto = await UserFoto.findOne({imageUrl: url})
        let comments = foto.comments
        comments = comments - 1
        await UserFoto.updateOne({imageUrl: url}, {comments})
        await FotoComment.findByIdAndDelete(id)
    }
    async deleteVideoComment(req, res) {
        const id = req.params.id
        const url = req.params.url
        console.log(id, url)
        const video = await UserVideo.findById(url)
        let comments = video.comments
        comments = comments - 1
        await UserVideo.updateOne({imageUrl: url}, {comments})
        await VideoComment.findByIdAndDelete(id)
    }
}

module.exports = new CommentService()