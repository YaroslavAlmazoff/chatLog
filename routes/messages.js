const { Router } = require("express")

const router = Router()
const auth = require('../middleware/auth.middleware')
const MessengerService = require("../services/MessengerService")

router.get('/createroom/:to', auth, (req, res) => {
    try {
        MessengerService.createRoom(req, res)
    } catch(e) {
        console.log(e)
    }
}) 
router.get('/getrooms', auth, (req, res) => {
    try {
        MessengerService.getRooms(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getroom/:user2', auth, (req, res) => {
    try {
        MessengerService.getRoom(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getmessages/:room', (req, res) => {
    try {
        MessengerService.getMessage(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getmessagesstart/:room', (req, res) => {
    try {
        MessengerService.getMessageStart(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/sendmessage/:room', auth, (req, res) => {
    try {
        MessengerService.sendMessage(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/roombyid/:id', (req, res) => {
    try {
        MessengerService.getRoomById(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/lastmessage/:room', (req, res) => {
    try {
        MessengerService.lastMessage(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/newmessage/:id', (req, res) => {
    try {
        MessengerService.newMessageExists(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/read/:id', (req, res) => {
    try {
        MessengerService.read(req, res)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router