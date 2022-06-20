const Support = require("../models/Support")
const Visit = require("../models/Visit")

class AdminService {
    async sendMessage(req, res) {
        const {message} = req.body
        await Support.create({text: message})
        res.json({msg: 'success!'})
    }
    async getMessages(req, res) {
        const messages = await Support.find({})
        res.json({messages})
    }
    async setVisit(req, res) {
        await Visit.create({text: 'visit'})
        res.json({msg: 'success!'})
    }
    async getVisits(req, res) {
        const visits = await Visit.find({})
        const visitsNumber = visits.length
        res.json({visits: visitsNumber})
    }

}

module.exports = new AdminService()