const Ad = require("../models/Ad")
const User = require("../models/User")
const uuid = require("uuid")
const FileService = require("./FileService")

class AdService {
    async create(req, res) {
        const {title, description, price, city, date, dieDate, user, category, phone} = req.body
        
        const images = Object.keys(req.files).map((file) => {
            const filename = uuid.v4() + '.jpg'
            return filename
        })
        await Ad.create({title, description, price, city, date, dieDate, active: true, user, category, phone, images})
        
        Object.keys(req.files).forEach((file, i) => {
            FileService.insertAdImage(req.files[file], images[i])
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
        const ads = allAds.filter(el => el.date.split('.')[0] === req.body.date.split('.')[0])
        allAds.forEach(el => {
            console.log(el.date, req.body.date, el.date === req.body.date)
        })
        res.json({ads})
    }
    async city(req, res) {
        const user = await User.findById(req.params.user)
        console.log(user)
        const allAds = await Ad.find({})
        const ads = allAds.filter(el => el.city.toLowerCase() === user.city.toLowerCase())
        let message
        if(user.city) {
            message = true
        } else {
            message = false
        }
        console.log(ads, message)
        res.json({ads, message})
    }
    async category(req, res) {
        const allAds = await Ad.find({})
        const ads = allAds.filter(el => el.category === req.body.category)
        res.json({ads})
    }
}

module.exports = new AdService()