const File = require('../models/File')
const path = require('path')
const fs = require('fs')
const textract = require('textract')
const NotificationService = require('./NotificationService')
const User = require('../models/User')
const Notification = require('../models/Notification')

//Сервис облачного хранилища
class CloudService {
    async upload(req, res) {
        const userid = req.user.userId
        const file = req.files.file
        console.log(file)
        const ext = file.name.split('.')[1]
        await File.create({
            name: file.name, ext, type: file.mimetype, size: file.size, owner: userid, public: false
        })
        const filePath = path.resolve('..', 'static', 'userfiles', userid, file.name)
        file.mv(filePath)
        console.log(this.getFilesInner(userid))
        res.json({files: this.getFilesInner(userid)})
    }
    async getFilesInner(owner) {
        const files = await File.find({owner})
        console.log(files)
        return files
    }
    async getFiles(req, res) {
        const owner = req.user.userId
        const files = await File.find({owner})
        res.json({files})
    }
    async deleteFile(req, res) {
        const owner = req.user.userId
        const name = req.params.filename
        await File.deleteOne({owner, name}) 
        fs.unlink(path.resolve('..', 'static', 'userfiles', owner, name), err => {
            if(err) {
                console.log(err)
            }
        })
        console.log(this.getFilesInner(owner))
        res.json({files: this.getFilesInner(owner)})
    }
    async fileText(req, res) {
        const owner = req.user.userId
        const name = req.params.filename
        fs.readFile(path.resolve('..', 'static', 'userfiles', owner, name), 'utf-8', (err, data) => {
            if(err) {
                console.log(err)
            } else {
                res.json({data})
            }
        })
    }
    async hardFileText(req, res) {
        const owner = req.user.userId
        const name = req.params.filename
        textract.fromFileWithPath(path.resolve('..', 'static', 'userfiles', owner, name), (err, text) => {
            if(err) {
                console.log(err)
            } else {
                console.log(text)
                res.json({text})
            }
        })
    }
    async fileById(req, res) {
        const id = req.params.id
        const file = await File.findById(id)
        res.json({file})
    }
    async publicFile(req, res) {
        const owner = req.user.userId
        const name = req.params.filename
        await File.findOneAndUpdate({owner, name}, {public: true})
        res.json({msg: 'да.'})
    }
    async sendFile(req, res) {
        const user1 = req.user.userId
        const user2 = req.params.user
        const fullUser1 = await User.findById(user1)
        const name = fullUser1.name
        const surname = fullUser1.surname
        NotificationService.create(user1, user2, `${name} ${surname} хочет отправить вам файл ${req.params.filename} Получить файл?`, 'file', 'cloud', req.params.filename)
        res.json({msg: 'да.'})
    }
    async getSentFile(req, res) {
        const id = req.params.id
        const notification = await Notification.findById(id)

        const user1 = notification.from
        const user2 = notification.to
        const filename = notification.postID
        const from = path.resolve('..', 'userfiles', user1, filename)
        const to = path.resolve('..', 'userfiles', user2, filename)
        console.log(from, to)
        fs.copyFile(from, to, (err) => {
            if (err) throw err;
            console.log('copyed.');
        });
        res.json({msg: 'да.'})
    }
}

module.exports = new CloudService()