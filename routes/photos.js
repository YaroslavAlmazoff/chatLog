const { Router } = require("express")
const PhotoService = require("../services/PhotoService")
const router = Router()

router.post('/create/:id', (req, res) => {
    try {
        PhotoService.create(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/photo/:id', (req, res) => {
    try {
        PhotoService.photo(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/new', (req, res) => {
    try {
        PhotoService.new(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/popular', (req, res) => {
    try {
        PhotoService.popular(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/setlikes/:id', (req, res) => {
    try {
        PhotoService.setLikes(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getlikes/:id', (req, res) => {
    try {
        PhotoService.getLikes(req, res)
    } catch(e) {
        console.log(e)
    }
})



module.exports = router