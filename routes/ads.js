const { Router } = require("express")
const AdService = require("../services/AdService")

const router = Router()

router.post('/create', (req, res) => {
    try {
        AdService.create(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/new/:date', (req, res) => {
    try {
        AdService.new(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/city/:user', (req, res) => {
    try {
        AdService.city(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/all', (req, res) => {
    try {
        AdService.all(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/category/:category', (req, res) => {
    try {
        AdService.category(req, res)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router