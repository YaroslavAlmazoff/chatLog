const InnerAd = require("../models/InnerAd")
const uuid = require("uuid")
const FileService = require('./FileService')

class InnerAdService {
    async create(req, res) {
        const {title, text, link, date} = req.body
        console.log(link)
        const imageUrl = uuid.v4() + '.jpg'
        await InnerAd.create({
            title, text, imageUrl, link, date, active: true
        })
        FileService.insertInnerAdImage(req.files.file, imageUrl)
        res.json({msg: 'success'})
    }
    async all(req, res) {
        const ads = await InnerAd.find({})
        res.json({ads})
    }
    async ad(req, res) {
        const ad = await InnerAd.findById(req.params.id)
        res.json({ad})
    }
}

module.exports = new InnerAdService()