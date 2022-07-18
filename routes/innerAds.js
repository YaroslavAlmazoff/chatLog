const { Router } = require("express")
const InnerAdService = require("../services/InnerAdService")

const router = Router()

router.post('/create', (req, res) => {
    try {
        InnerAdService.create(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/all', (req, res) => {
    try {
        InnerAdService.all(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/ad/:id', (req, res) => {
    try {
        InnerAdService.ad(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/random', (req, res) => {
    try {
        InnerAdService.randomAds(req, res)
    } catch(e) {
        console.log(e)
    }
})


module.exports = router