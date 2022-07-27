const uuid = require('uuid')
const Channel = require('../../models/Channel')
const User = require('../../models/User')
const FileService = require('../FileService')

class VideohostChannelsController {
    subscribersToPopular = 5
    newChannelsToShow = 30
    popularChannelsToShow = 30
    recommendedChannelsToShow = 50
    sameChannelsToShow = 5

    async create(req, res) {
        const admin = req.user.userId
        const {name, description, category} = req.body

        const avatarUrl = uuid.v4() + '.jpg'
        const bannerUrl = uuid.v4() + '.jpg'

        await Channel.create({name, description, category, admin})

        if(req.files) {
            if(req.files.avatar) {
                FileService.insertVideohostChannelAvatar(req.files.avatar, avatarUrl)
                await Channel.findOneAndUpdate({name}, {avatarUrl})
            }
            if(req.files.banner) {
                FileService.insertVideohostChannelBanner(req.files.banner, bannerUrl)
                await Channel.findOneAndUpdate({name}, {bannerUrl})
            }
        }
        res.json({msg: 'registered'})
    }
    async edit(req, res) {
        const {name, description, category} = req.body

        const avatarUrl = uuid.v4() + '.jpg'
        const bannerUrl = uuid.v4() + '.jpg'

        await Channel.findByIdAndUpdate(req.body.id, {name, description, category})

        if(req.files) {
            if(req.files.avatar) {
                FileService.insertVideohostChannelAvatar(req.files.avatar, avatarUrl)
                await Channel.findOneAndUpdate({name}, {avatarUrl})
            }
            if(req.files.banner) {
                FileService.insertVideohostChannelBanner(req.files.banner, bannerUrl)
                await Channel.findOneAndUpdate({name}, {bannerUrl})
            }
        }
        res.json({msg: 'updated'})
    }
    async channel(req, res) {
        const channel = await Channel.findById(req.params.id)
        res.json({channel})
    }
    async popular(req, res) {
        const allChannels = await Channel.find({})
        const popular = allChannels.filter(el => el.subscribers.length >= this.subscribersToPopular)
        const channels = popular.slice(this.popularChannelsToShow, popular.length)
        res.json({channels})
    }
    async new(req, res) {
        const allChannels = await Channel.find({})
        const newChannels = allChannels.filter(el => el.date.split('.')[0] === req.params.date.split('.')[0])
        const channels = newChannels.slice(this.newChannelsToShow, newChannels.length)
        res.json({channels})
    }
    async recommended(req, res) {
        const user = await User.findById(req.params.id)
        if(user.videohostCategories.length > 0) {
            const allChannels = await Channel.find({})
            const recommended = allChannels.filter(el => {
                user.videohostCategories.forEach(item => {
                    if(item === el.category) return true
                });
            })
            const channels = recommended.slice(this.recommendedChannelsToShow, recommended.length)
            res.json({channels})
        } else {
            res.json({channels: []})
        }
    }
    async same(req, res) {
        const allChannels = await Channel.find({})
        const same = allChannels.filter(el => el.category === req.body.category)
        const channels = same.slice(this.sameChannelsToShow, same.length)
        res.json({channels})
    }
    async delete(req, res) {
        await Channel.findByIdAndDelete(req.params.id)
        res.json({msg: 'deleted'})
    }
    async checkName(req, res) {
        const name = req.body.name
        const channel = await Channel.findOne({name})
        if(channel) {
            res.json({message: true})
        } else {
            res.json({message: false})
        }
    }
    async subscribers(req, res) {
        const channel = await Channel.findById(req.params.id)
        const subscriberIDs = channel.subscribers
        const subscribers = subscriberIDs.map(el => {
            const user = await User.findById(el)
            return user
        })
        res.json({subscribers})
    }
}

module.exports = new VideohostChannelsController()