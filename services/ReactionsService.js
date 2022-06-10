const FotoComment = require('../models/FotoComment.js')
const User = require('../models/User.js')
const UserFoto = require('../models/UserFoto.js')
const UserPost = require('../models/UserPost.js')
const UserVideo = require('../models/UserVideo.js')
const NotificationService = require('./NotificationService.js')

//Сервис для количества лайков и комментариев
class ReactionService {
    //Увеличение количества лайков
    async like(req, res) {
        try {
            //Получение ID поста
            const {id} = req.body
            //Получение ID пользователя
            const userid = req.user.userId
            const user = await User.findById(userid)
            //Поиск поста
            console.log('айди, ', id)
            const needArticle = await UserPost.findById(id)
            let likes = needArticle.likes
            let likers = needArticle.likers
            
            if(req.body.sub) {
                //Дизлайк
                delete likers[likers.indexOf(userid)]
                likers = likers.filter(el => el !== null)
                const newLikes = likes - 1
                const itog = await UserPost.findByIdAndUpdate(id, {likes: newLikes, likers})
                //Возвращение нового количества лайков
                res.json({itog})
            } else {
                //Лайк
                likers.push(userid)
                const newLikes = 1 + likes
                const itog = await UserPost.findByIdAndUpdate(id, {likes: newLikes, likers})
                const text = `Ваша публикация понравилась полюзователю ${user.name} ${user.surname}.`
                NotificationService.create(userid, needArticle.user, text, 'like', 'article', id)
                //Возвращение обновлённого количества лайков на клиент
                res.json({itog})
            }
        } catch(e) {
            console.log(e)
        }

    }
    //Увеличение количества комментариев
    async comment(req, res) {
        try {
            //Получение ID поста
            const {id} = req.body
            //Поиск поста
            const needArticle = await UserPost.findById(id)
            let comms = needArticle.comments
            //Новый комментарий
            const newComms = 1 + comms
            //Обновление количества комментариев
            const itog = await UserPost.findByIdAndUpdate(id, {comments: newComms})
            //Возвращение обновлённого количества комментариев на клиент
            res.json({itog})
        } catch(e) {
            console.log(e)
        }

    }
    async likeFoto(req, res) {
        const {sub} = req.body
        const userid = req.user.userId
        const user = await User.findById(userid)
        const fotourl = req.params.url 
        console.log(sub, userid, fotourl)
        const foto = await UserFoto.findOne({imageUrl: fotourl})

        let likers = foto.likers
        const likes = foto.likes
        if(sub) {
            //Дизлайк
            delete likers[likers.indexOf(userid)]
            likers = likers.filter(el => el !== null)
            const newLikes = likes - 1
            const updated = await UserFoto.updateOne({imageUrl: fotourl}, {likes: newLikes, likers})
            //Возвращение нового количества лайков
            res.json({updated})   
        } else {
            //Лайк
            likers.push(userid)
            const newLikes = 1 + likes
            const updated = await UserFoto.updateOne({imageUrl: fotourl}, {likes: newLikes, likers})
            const text = `Ваша публикация понравилась полюзователю ${user.name} ${user.surname}.`
            NotificationService.create(userid, foto.user, text, 'like', 'fotorgraphy', fotourl)
            //Возвращение обновлённого количества лайков на клиент
            res.json({updated})
        }
    }
    async likeVideo(req, res) {
        const {sub, id} = req.body
        const userid = req.user.userId
        const user = await User.findById(userid)
        const video = await UserVideo.findById(id)

        let likers = video.likers
        const likes = video.likes
        if(sub) {
            //Дизлайк
            delete likers[likers.indexOf(userid)]
            likers = likers.filter(el => el !== null)
            const newLikes = likes - 1
            const updated = await UserVideo.findByIdAndUpdate(id, {likes: newLikes, likers})
            //Возвращение нового количества лайков
            res.json({updated})   
        } else {
            //Лайк
            likers.push(userid)
            const newLikes = 1 + likes
            const updated = await UserVideo.findByIdAndUpdate(id, {likes: newLikes, likers})
            const text = `Ваша публикация понравилась полюзователю ${user.name} ${user.surname}.`
            NotificationService.create(userid, video.user, text, 'like', 'video', id)
            //Возвращение обновлённого количества лайков на клиент
            res.json({updated})
        }
    }
    async plusFotoComm(req, res) {
        try {
            //Получение ID фото
            const url = req.params.url
            //Поиск фото
            const needArticle = await UserFoto.findOne({imageUrl: url})
            let comms = needArticle.comments
            //Новый комментарий
            const newComms = 1 + comms
            //Обновление количества комментариев
            const updated = await UserFoto.updateOne({imageUrl: url}, {comments: newComms})
            //Возвращение обновлённого количества комментариев на клиент
            res.json({updated})
        } catch(e) {
            console.log(e)
        }

    }
    async plusVideoComm(req, res) {
        try {
            //Получение ID фото
            const url = req.params.url
            //Поиск фото
            const needArticle = await UserVideo.findOne({imageUrl: url})
            let comms = needArticle.comments
            //Новый комментарий
            const newComms = 1 + comms
            //Обновление количества комментариев
            const updated = await UserVideo.updateOne({imageUrl: url}, {comments: newComms})
            //Возвращение обновлённого количества комментариев на клиент
            res.json({updated})
        } catch(e) {
            console.log(e)
        }

    }
}

module.exports = new ReactionService()