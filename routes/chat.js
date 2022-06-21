const { Router } = require("express")

const router = Router()
const auth = require('../middleware/auth.middleware')
const ChatService = require("../services/ChatService")

router.get('/createroom/:to', auth, (req, res) => {
    try {
        ChatService.createRoom(req, res)
    } catch(e) {
        console.log(e)
    }
}) 
router.get('/getroom/:user2', auth, (req, res) => {
    try {
        ChatService.getRoom(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getmessages/:room', (req, res) => {
    try {
        ChatService.getMessage(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getmessagesstart/:room', (req, res) => {
    try {
        ChatService.getMessageStart(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/sendmessage/:room', auth, (req, res) => {
    try {
        ChatService.sendMessage(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/checkrooms/:user', auth, (req, res) => {
    try {
        ChatService.checkRooms(req, res)
    } catch(e) {
        console.log(e)
    } 
})


module.exports = router