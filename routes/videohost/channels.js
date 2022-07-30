const { Router } = require("express")
const router = Router()
const auth = require('../../middleware/auth.middleware')
const VideohostChannelsController = require("../../services/Videohost/VideohostChannelsController")

router.post('/create', auth, (req, res) => {
    try {
        VideohostChannelsController.create(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/edit', auth, (req, res) => {
    try {
        VideohostChannelsController.edit(req, res)
    } catch (e) {
        console.log(e)
    }
})

router.get('/channel/:id', (req, res) => {
    try {
        VideohostChannelsController.channel(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/channelbyname', (req, res) => {
    try {
        VideohostChannelsController.channelByName(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/channelbyadmin/:id', (req, res) => {
    try {
        VideohostChannelsController.channelByAdmin(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/popular', (req, res) => {
    try {
        VideohostChannelsController.popular(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/new/:date', (req, res) => {
    try {
        VideohostChannelsController.new(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/recommended/:id', (req, res) => {
    try {
        VideohostChannelsController.recommended(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/same', (req, res) => {
    try {
        VideohostChannelsController.same(req, res)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', (req, res) => {
    try {
        VideohostChannelsController.delete(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/checkname', (req, res) => {
    try {
        VideohostChannelsController.checkName(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/subscribers/:id', (req, res) => {
    try {
        VideohostChannelsController.subscribers(req, res)
    } catch(e) {
        console.log(e)
    }
})



module.exports = router