const InnerAd = require("../models/InnerAd")
const uuid = require("uuid")
const FileService = require('./FileService')

class InnerAdService {
    shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }
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
    async randomAds(req, res) {
        const ads = await InnerAd.find({})
        res.json({ads: this.shuffle(ads)})
    }
}

module.exports = new InnerAdService()