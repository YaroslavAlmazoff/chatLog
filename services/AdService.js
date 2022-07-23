const Ad = require("../models/Ad")
const User = require("../models/User")
const uuid = require("uuid")
const FileService = require("./FileService")

class AdService {
    async create(req, res) {
        const {title, description, price, city, date, dieDate, user, category, phone} = req.body
        //await Ad.create({title, description, price, date, dieDate, active: true, city, user, category})
        console.log(typeof req.files)
        Object.keys(req.files).forEach((file) => {
            const filename = uuid.v4() + '.jpg'
            console.log(file)
            //FileService.insertAdImage(file, filename)
        })
        res.json({files: req.files})
    }
    async all(req, res) {
        const ads = await Ad.find({})
        res.json({ads})
    }
    async ad(req, res) {
        const ad = await Ad.findById(req.params.id)
    }
    async new(req, res) {
        const allAds = await Ad.find({})
        const ads = allAds.filter(el => el.date.split('.')[0] === req.params.date.split('.')[0])
        res.json({ads})
    }
    async city(req, res) {
        const user = await User.findById(req.params.user)
        const allAds = await Ad.find({})
        const ads = allAds.filter(el => el.city === user.city)
        let message
        if(user.city) {
            message = true
        } else {
            message = false
        }
        res.json({ads, message})
    }
    async category(req, res) {
        const allAds = await Ad.find({})
        const ads = ads.filter(el => el.category === req.params.category)
        res.json({ads})
    }
}

module.exports = new AdService()