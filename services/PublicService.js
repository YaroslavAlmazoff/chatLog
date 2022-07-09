const Public = require("../models/Public")
const uuid = require('uuid')
const Notification = require('../models/Notification')
const FileService = require("./FileService")
const PublicPost = require("../models/PublicPost")

class PublicService {
    async all(req, res) {
        const publics = await Public.find({}) 
        res.json({publics})
    }
    async create(req, res) {
        const admin = req.user.userId
        const {name, description} = req.body
        const avatarUrl = uuid.v4() + '.jpg'
        const bannerUrl = uuid.v4() + '.jpg'
        
        if(req.files) {
            if(req.files.avatar) {
                await UserPost.create({
                    name, description, admin, avatarUrl
                })
            }
            if(req.files.banner) {
                await UserPost.create({
                    name, description, admin, bannerUrl
                })
            }
        } else {
            await UserPost.create({
                name, description, admin
            })
        }
        if(req.files) {
            if(req.files.avatar) {
                FileService.insertPublicAvatar(req.files.file, avatarUrl)
            }
            if(req.files.banner) {
                FileService.insertPublicBanner(req.files.file, bannerUrl)
            }
        }
        res.json({id: '-_-'})
    }
    async edit(req, res) {
        const {id, name, description, category, admin} = req.body
        const avatarUrl = uuid.v4() + '.jpg'
        const bannerUrl = uuid.v4() + '.jpg'
        if(req.files) {
            if(req.files.avatar) {
                FileService.insertPublicAvatar(req.files.file, avatarUrl)
                await Public.findByIdAndUpdate(id, {avatarUrl, name, description, category, admin})
            }
            if(req.files.banner) {
                FileService.insertPublicBanner(req.files.file, bannerUrl)
                await Public.findByIdAndUpdate(id, {bannerUrl, name, description, category, admin})
            }
        }
        res.json({url: '-_-'})
    }
    async notifications(req, res) {
        const id = req.params.id
        const user = req.params.user
        const notifications = await Notification.find({to: id})
        res.json({notifications})
    }
    async createFoto(req, res) {
        const id = req.params.id
        const filename = uuid.v4() + '.' + res.files.foto.ext 
        FileService.insertPublicFoto(req.files.foto, filename)
        const public = await Public.findById(id)
        const fotos = public.fotos
        fotos.push(filename)
        await Public.findByIdAndUpdate(id, {fotos})
        res.json({msg: 'success created foto'})
    }
    async createPost(req, res) {
        const id = req.params.id
        const {text, date} = req.body
        if(req.files) {
            if(req.files.img) {
                const imageUrl = uuid.v4() + req.files.img.ext
                FileService.insertPublicPost
                await PublicPost.create({public: id, text, date, likes: 0, comments: 0, imageUrl})
            }
        }
        res.json({msg: '-_-'})
    }
    async public(req, res) {
        const public = await Public.findById(req.params.id)
        res.json({public})
    }
    async firstFotos(req, res) {
        const public = await Public.findById(req.params.id)
        const fotos = public.fotos.slice(public.fotos.length - 6)
        res.json({fotos})
    }
    async allFotos(req, res) {
        const public = await Public.findById(req.params.id)
        res.json({fotos: public.fotos})
    }
    async post(req, res) {
        const post = await PublicPost.findById(id)
        res.json({post})
    }
    async firstSubscribers(req, res) {
        const public = await Public.findById(req.params.id)
        const subscribers = public.subscribers.slice(public.subscribers.length - 6)
        res.json({subscribers})
    }
    async allSubscribers(req, res) {
        const public = await Public.findById(req.params.id)
        res.json({subscribers: public.subscribers})
    }
    async subscribe(req, res) {
        const user = req.user.userId
        const public = await Public.findById(req.params.id)
        const subscribers = public.subscribers
        subscribers.push(user)
        await Public.findByIdAndUpdate(id, {subscribers})
        res.json({msg: 'success subscribe'})
    }

}

module.exports = new PublicService()