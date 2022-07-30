const Channel = require('../../models/Channel')
const User = require('../../models/User')
const Video = require('../../models/Video')
const Comment = require('../../models/VideohostComment')

class VideohostUserActionsController {
    async likeVideo(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {likes: video.likes++})
        res.json({msg: 'liked'})
    }
    async likeComment(req, res) {
        const comment = await Comment.findById(req.params.id)
        await Comment.findByIdAndUpdate(req.params.id, {likes: comment.likes++})
        res.json({msg: 'liked'})
    }
    async dislikeVideo(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {likes: video.likes--})
        res.json({msg: 'disliked'})
    }
    async dislikeComment(req, res) {
        const comment = await Comment.findById(req.params.id)
        await Comment.findByIdAndUpdate(req.params.id, {likes: comment.likes--})
        res.json({msg: 'disliked'})
    }
    async view(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {views: video.views++})
        res.json({msg: 'viewed'})
    }
    async comment(req, res) {
        const {text, date} = req.body
        await Comment.create({text, date, videoID: req.params.id, user: req.user.userId})
        res.json({msg:'success'})
    }
    async deleteComment(req, res) {
        await Comment.findByIdAndDelete(req.params.id)
        res.json({msg: 'deleted'})
    }
    async subscribe(req, res) {
        const channel = await Channel.findById(req.params.id)
        const subscribers = channel.subscribers.push(req.user.userId)
        await Channel.findByIdAndUpdate(req.params.id, {subscribers})
        res.json({msg: 'Subscribed'})
    }
    async unbscribe(req, res) {
        const channel = await Channel.findById(req.params.id)
        const allSubscribers = channel.subscribers.push(req.user.userId)
        const index = subscribers.findIndex(el => el._id === req.user.userId)
        const subscribers = allSubscribers.slice(index, 1)
        await Channel.findByIdAndUpdate(req.params.id, {subscribers})
        res.json({msg: 'отписка'})
    }
    async prefer(req, res) {
        const {id, category} = req.body
        const user = await User.findById(id)
        const preferences = user.videohostCategories
        const videohostCategories = preferences.push(category)
        await User.findByIdAndUpdate(id, {videohostCategories})
        res.json({videohostCategories})
    }
}

module.exports = new VideohostUserActionsController()