const InnerAd = require("../models/InnerAd")
const uuid = require("uuid")
const FileService = require('./FileService')
const { findByIdAndDelete } = require("../models/InnerAd")

class InnerAdService {
    shuffle(array) {
        let currentIndex = array.length,  randomIndex
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex--
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
        }
        return array
    }
    async create(req, res) {
        const {title, text, link, date, dieDate} = req.body
        const imageUrl = uuid.v4() + '.jpg'
        await InnerAd.create({
            title, text, imageUrl, link, date, active: true, user: req.params.id, dieDate
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
    async randomAds(req, res) {
        const ads = await InnerAd.find({})
        res.json({ads: this.shuffle(ads)})
    }
    async view(req, res) {
        const ad = await InnerAd.findById(req.params.id)
        const views = ad.views + 1
        await InnerAd.findByIdAndUpdate(req.params.id, {views})
        if(ad.dieDate.split('.')[0]+'.'+ad.dieDate.split('.')[1] === req.params.date.split('.')[0]+'.'+req.params.date.split('.')[1]) {
            await InnerAd.findByIdAndDelete(req.params.id)
        }
        res.json({msg: 'view'})
    }
    async click(req, res) {
        const ad = await InnerAd.findById(req.params.id)
        const clicks = ad.clicks + 1
        await InnerAd.findByIdAndUpdate(req.params.id, {clicks})
        res.json({msg: 'click'})
    }
    async userads(req, res) {
        const ads = await InnerAd.find({user: req.params.id})
        res.json({ads})
    }
}

module.exports = new InnerAdService()