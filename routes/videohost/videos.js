const { Router } = require("express")
const router = Router()
const auth = require('../../middleware/auth.middleware')
const VideohostVideosController = require("../../services/Videohost/VideohostVideosController")

router.post('/create', auth, (req, res) => {
    try {
        VideohostVideosController.create(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/edit', auth, (req, res) => {
    try {
        VideohostVideosController.edit(req, res)
    } catch (e) {
        console.log(e)
    }
})

router.get('/video/:id', (req, res) => {
    try {
        VideohostVideosController.video(req, res)
    } catch (e) {
        console.log(e)
    }
})

router.get('/videos/popular', (req, res) => {
    try {
        VideohostVideosController.popular(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/videos/new/:date', (req, res) => {
    try {
        VideohostVideosController.new(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/videos/recommendedmain/:id', (req, res) => {
    try {
        VideohostVideosController.recommendedMain(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/videos/recommendedvideopage/:id', (req, res) => {
    try {
        VideohostVideosController.recommendedVideoPage(req, res)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/delete/:id', (req, res) => {
    try {
        VideohostVideosController.delete(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/checkname', (req, res) => {
    try {
        VideohostVideosController.checkName(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/comments/:id', (req, res) => {
    try {
        VideohostVideosController.comments(req, res)
    } catch(e) {
        console.log(e)
    }
})



module.exports = router