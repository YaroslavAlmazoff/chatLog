const uuid = require('uuid')
const Video = require('../../models/Video')
const Channel = require('../../models/Channel')
const User = require('../../models/User')
const FileService = require('../FileService')
const Comment = require('../../models/VideohostComment')

class VideohostVideosController {
    likesToPopular = 5
    newVideosToShow = 30
    popularVideosToShow = 30
    recommendedVideosToShowMain = 50
    recommendedVideosToShowVideoPage = 5
    sameVideosToShow = 5

    async create(req, res) {
        const channel = await Channel.findById(req.body.channel)
        const {title, description, date} = req.body

        const previewUrl = uuid.v4() + '.jpg'
        const videoUrl = uuid.v4() + '.mp4'

        await Video.create({title, description, date, category: channel.category, channel: channel._id, previewUrl, videoUrl})

        FileService.insertVideohostVideoPreview(req.files.preview, previewUrl)
        FileService.insertVideohostVideo(req.files.video, videoUrl)

        res.json({msg: 'created'})
    }
    async edit(req, res) {
        const {title, description} = req.body

        const previewUrl = uuid.v4() + '.jpg'

        await Video.findByIdAndUpdate(req.body.id, {title, description})

        if(req.files.preview) {
            FileService.insertVideohostVideoPreview(req.files.preview, previewUrl)
            await Video.findOneAndUpdate({title}, {previewUrl})
        }
        res.json({msg: 'updated'})
    }
    async video(req, res) {
        const video = await Video.findById(req.params.id)
        res.json({video})
    }
    async popular(req, res) {
        const allVideos = await Video.find({})
        const popular = allVideos.filter(el => el.likes >= this.likesToPopular)
        const videos = popular.slice(this.popularVideosToShow, popular.length)
        res.json({videos})
    }
    async new(req, res) {
        const allVideos = await Video.find({})
        const newVideos = allVideos.filter(el => el.date.split('.')[0] === req.params.date.split('.')[0])
        const videos = newVideos.slice(this.newVideosToShow, newVideos.length)
        res.json({videos})
    }
    async sameMain(req, res) {
        const allVideos = await Video.find({})
        const same = allVideos.filter(el => el.category === req.body.category)
        const videos = same.slice(this.sameVideosToShow, same.length)
        res.json({videos})
    }
    async same(req, res) {
        const allVideos = await Video.find({})
        const videos = allVideos.filter(el => el.category === req.body.category)
        res.json({videos})
    }
    async recommended(req, res) {
        const user = await User.findById(req.params.id)
        if(user.videohostCategories.length > 0) {
            const allVideos = await Video.find({})
            const videos = allVideos.filter(el => {
                user.videohostCategories.forEach(item => {
                    if(item === el.category) return true
                });
            })
            res.json({videos})
        } else {
            res.json({videos: []})
        }
    }
    async recommendedMain(req, res) {
        const user = await User.findById(req.params.id)
        if(user.videohostCategories.length > 0) {
            const allVideos = await Video.find({})
            const recommended = allVideos.filter(el => {
                user.videohostCategories.forEach(item => {
                    if(item === el.category) return true
                });
            })
            const videos = recommended.slice(this.recomendedVideosToShowMain, recommended.length)
            res.json({videos})
        } else {
            res.json({videos: []})
        }
    }
    async recommendedVideoPage(req, res) {
        const user = await User.findById(req.params.id)
        if(user.videohostCategories.length > 0) {
            const allVideos = await Video.find({})
            const recommended = allVideos.filter(el => {
                user.videohostCategories.forEach(item => {
                    if(item === el.category) return true
                });
            })
            const videos = recommended.slice(this.recommendedVideosToShowVideoPage, recommended.length)
            res.json({videos})
        } else {
            res.json({videos: []})
        }
    }
    async delete(req, res) {
        await Video.findByIdAndDelete(req.params.id)
        res.json({msg: 'deleted'})
    }
    async checkName(req, res) {
        const name = req.body.name
        const video = await Video.findOne({name})
        if(video) {
            res.json({message: true})
        } else {
            res.json({message: false})
        }
    }
    async comments(req, res) {
        const comment = await Comment.find({videoID: req.params.id})
        res.json({comment})
    }
    async author(req, res) {
        const channelID = req.params.id
        const channel = Channel.findById(channelID)
        res.json({name: channel.name})
    }
    async channelVideos(req, res) {
        const videos = Video.find({channel: req.params.id})
        res.json({videos})
    }
    async videosCount(req, res) {
        const videos = await Video.find({channel: req.params.id})
        res.json({count: videos.length})
    }
    async isAdmin(req, res) {
        const user = req.user.userId
        const video = req.params.id
        const channel = await Channel.findById(video.channel)
        if(channel.admin === user) {
            res.json({isAdmin: true})
        } else {
            res.json({isAdmin: false})
        }
    }
}

module.exports = new VideohostVideosController()