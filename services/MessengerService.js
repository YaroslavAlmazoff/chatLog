const Room = require('../models/Room')
const events = require('events')
const emitter = new events.EventEmitter()
const Message = require('../models/Message')
const User = require('../models/User')
const FileService = require('./FileService')
const uuid = require('uuid')


class MessengerService {
    async createRoom(req, res) {
        const user1 = req.user.userId
        const user2 = req.params.to

        await Room.create({user1, user2})
        res.json({msg: 'success'})
    }
    async getRooms(req, res) {
        const user = req.user.userId

        let rooms1 = await Room.find({user1: user})
        let rooms2 = await Room.find({user2: user})
        const rooms = rooms1.concat(rooms2)
        res.json({rooms})
    }
    async getRoom(req, res) {
        const user1 = req.user.userId
        const user2 = req.params.user2

        let room = await Room.findOne({user1, user2})
        if(!room) {
            room = await Room.findOne({user1: user2, user2: user1})
        }
        res.json({room})
    }
    async getRoomId(req, res) {
        const user1 = req.user.userId
        const user2 = req.params.user2

        let room = await Room.findOne({user1, user2})
        if(!room) {
            room = await Room.findOne({user1: user2, user2: user1})
        }
        res.json({room: room._id})
    }
    async getRoomById(req, res) {
        const id = req.params.id
        const room = await Room.findById(id)
        res.json({room})
    }
    async getMessageStart(req, res) {
        const room = req.params.room
        const messages = await Message.find({room})
        res.json({messages})
    }
    async getMessage(req, res) {
        emitter.once('newMessage', async (message) => {
            const room = req.params.room
            const messages = await Message.find({room})
            res.json({messages})
        })
    }
    
    async sendMessage(req, res) {
        const {message, date, isFile} = req.body
        const room = req.params.room
        const user = req.user.userId
        let filename
        if(req.files) {
            filename = uuid.v4() + '.jpg'
        }
        const USER = await User.findById(user)
        await Message.create({
            message, name: USER.name, avatarUrl: USER.avatarUrl, date, user, room, isNotReaded: true, isFile, imageUrl: filename
        }).then(() => {
            //Когда новое сообщение создалось в базе данных, получение ID сообщения и загрузка изображения на диск
            Message.findOne({date}).then((newValue) => {
                const id = newValue._id
                if(req.files) {
                    FileService.insertMessageFoto(req.files.file, id, filename)
                }
                res.json({id})
            })
        })

        emitter.emit('newMessage', message)
        res.status(200)
    }
    async lastMessage(req, res) {
        const lastMessage = req.body.lastMessage
        const room = req.params.room

        await Room.findByIdAndUpdate(room, {lastMessage})
        res.json({msg: 'success'})
    }
    async newMessageExists(req, res) {
        const room = req.params.id

        const messages = await Message.find({room})
        if(!messages.length) {
            return 
        }
        const isNotReaded = messages[messages.length - 1].isNotReaded
        res.json({isNotReaded})
    }
    async read(req, res) {
        const room = req.params.id
        const messages = await Message.find({room})
        if(!messages.length) {
            return
        }
        await Message.findByIdAndUpdate(messages[messages.length - 1], {isNotReaded: false})
        res.json({msg: 'success'})
    }
    async checkRooms(req, res) {
        const user1 = req.user.userId
        const user2 = req.params.user

        const room1 = await Room.findOne({user1, user2})
        const room2 = await Room.findOne({user1: user2, user2: user1})

        console.log(room1, room2)

        if(room1) {
            res.json({room: room1._id})
        } else if(room2) {
            res.json({room: room2._id})
        } else {
            res.json({room: null})
        }
    }
    async getFullLastMessage(req, res) {
        const id = req.params.id
        const messages = await Message.find({room: id})
        if(!messages.length) {
            return
        }
        const lastMessage = messages[messages.length - 1]
        res.json({fullLastMessage: lastMessage})
    }
}

module.exports = new MessengerService()