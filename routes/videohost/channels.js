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

router.get('/channels/popular', (req, res) => {
    try {
        VideohostChannelsController.popular(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/channels/new/:date', (req, res) => {
    try {
        VideohostChannelsController.new(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/channels/recommended/:id', (req, res) => {
    try {
        VideohostChannelsController.recommended(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/channels/same', (req, res) => {
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