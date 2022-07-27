const Channel = require('../../models/Channel')
const Video = require('../../models/Video')
const Comment = require('../../models/VideohostComment')

class VideohostUserActionsController {
    async likeVideo(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {likes: video.likes++})
    }
    async likeComment(req, res) {
        const comment = await Comment.findById(req.params.id)
        await Comment.findByIdAndUpdate(req.params.id, {likes: comment.likes++})
    }
    async dislikeVideo(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {likes: video.likes--})
    }
    async dislikeComment(req, res) {
        const comment = await Comment.findById(req.params.id)
        await Comment.findByIdAndUpdate(req.params.id, {likes: comment.likes--})
    }
    async view(req, res) {
        const video = await Video.findById(req.params.id)
        await Video.findByIdAndUpdate(req.params.id, {views: video.views++})
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
    }
    async unbscribe(req, res) {
        const channel = await Channel.findById(req.params.id)
        const allSubscribers = channel.subscribers.push(req.user.userId)
        const index = subscribers.findIndex(el => el._id === req.user.userId)
        const subscribers = allSubscribers.slice(index, 1)
        await Channel.findByIdAndUpdate(req.params.id, {subscribers})
        res.json({msg: 'отписка'})
    }
}

module.exports = new VideohostUserActionsController()