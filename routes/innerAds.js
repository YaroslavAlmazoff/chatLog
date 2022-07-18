const { Router } = require("express")
const InnerAdService = require("../services/InnerAdService")

const router = Router()

router.post('/create/:id', (req, res) => {
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

router.get('/view/:id', (req, res) => {
    try {
        InnerAdService.view(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/click/:id', (req, res) => {
    try {
        InnerAdService.click(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/userads/:id', (req, res) => {
    try {
        InnerAdService.userads(req, res)
    } catch(e) {
        console.log(e)
    }
})


module.exports = router