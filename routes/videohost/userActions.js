const { Router } = require("express")
const router = Router()
const auth = require('../../middleware/auth.middleware')
const VideohostUserActionsController = require("../../services/Videohost/VideohostUserActionsController")

router.get('/likevideo/:id', (req, res) => {
    try {
        VideohostUserActionsController.likeVideo(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/likecomment/:id', (req, res) => {
    try {
        VideohostUserActionsController.likeComment(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/dislikevideo/:id', (req, res) => {
    try {
        VideohostUserActionsController.dislikeVideo(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/dislikecomment/:id', (req, res) => {
    try {
        VideohostUserActionsController.dislikeComment(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/view/:id', (req, res) => {
    try {
        VideohostUserActionsController.view(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/comment/:id', auth, (req, res) => {
    try {
        VideohostUserActionsController.comment(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/deletecomment/:id', (req, res) => {
    try {
        VideohostUserActionsController.deleteComment(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/subscribe/:id', auth, (req, res) => {
    try {
        VideohostUserActionsController.subscribe(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/unscribe/:id', auth, (req, res) => {
    try {
        VideohostUserActionsController.unbscribe(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.post('/prefer', auth, (req, res) => {
    try {
        VideohostUserActionsController.prefer(req, res)
    } catch(e) {
        console.log(e)
    }
})





module.exports = router