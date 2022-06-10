const User = require("../models/User")
const UserPost = require("../models/UserPost")
const UserVideo = require("../models/UserVideo")
const NotificationService = require("./NotificationService")

class VisitService {
    async visitProfile(req, res) {
        const fromID = req.user.userId
        const toID = req.params.toid
        if(fromID === toID) {
            res.json({msg: 'self.'})
        } else {
            const user = await User.findById(fromID)
            const text = `Вашу страницу посетил(а) ${user.name} ${user.surname}.`
            await NotificationService.create(fromID, toID, text, 'visit')
            res.json({msg: 'success'})
        }
    }
    async visitPost(req, res) {
        const userid = req.user.userId
        const postid = req.params.postid
        const post = await UserPost.findById(postid)
        if(userid === post.user) {
            res.json({msg: 'self.'})
        } else {
            const user = await User.findById(userid)
            const text = `Вашу публикацию посмотрел(а) ${user.name} ${user.surname}.`
            await NotificationService.create(userid, post.user, text, 'postvisit', 'article', postid)
            res.json({msg: 'success'})
        }
    }
    async visitFoto(req, res) {
        const userid = req.user.userId
        const fotourl = req.params.postid
        const foto = await UserPost.findOne({imageUrl: fotourl})
        if(userid === foto.user) {
            res.json({msg: 'self.'})
        } else {
            const user = await User.findById(userid)
            const text = `Вашу публикацию посмотрел(а) ${user.name} ${user.surname}.`
            await NotificationService.create(userid, foto.user, text, 'postvisit', 'fotography', fotourl)
            res.json({msg: 'success'})
        }
    }
    async visitVideo(req, res) {
        const userid = req.user.userId
        const videoid = req.params.postid
        console.log(videoid)
        const video = await UserVideo.findById(videoid)
        if(userid === video.user) {
            res.json({msg: 'self.'})
        } else {
            const user = await User.findById(userid)
            const text = `Вашу публикацию посмотрел(а) ${user.name} ${user.surname}.`
            await NotificationService.create(userid, video.user, text, 'postvisit', 'video', videourl)
            res.json({msg: 'success'})
        }
    }
}

module.exports = new VisitService()