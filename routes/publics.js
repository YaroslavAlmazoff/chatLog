const { Router } = require("express")
const PublicService = require("../services/PublicService")
const router = Router()

const auth = require('../middleware/auth.middleware')

router.get('/all', (req, res) => {
    try {
        PublicService.all(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.post('/create', auth, (req, res) => {
    try {
        PublicService.create(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.post('/edit/:id', (req, res) => {
    try {
        PublicService.edit(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/notifications/:id', (req, res) => {
    try {
        PublicService.notifications(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.post('/createfoto/:id', (req, res) => {
    try {
        PublicService.createFoto(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.post('/createpost/:id', (req, res) => {
    try {
        PublicService.createPost(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/public/:id', (req, res) => {
    try {
        PublicService.public(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/firstfotos/:id', (req, res) => {
    try {
        PublicService.firstFotos(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.get('/allfotos/:id', (req, res) => {
    try {
        PublicService.allfotos(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.get('/post/:id', (req, res) => {
    try {
        PublicService.post(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/firstsubscribers/:id', (req, res) => {
    try {
        PublicService.firstSubscribers(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.get('/allsubscribers/:id', (req, res) => {
    try {
        PublicService.allSubscribers(req, res)
    } catch(e) {
        console.log(e)
    }
})

router.post('/subscribe/:id', auth, (req, res) => {
    try {
        PublicService.subscribe(req, res)
    } catch(e) {
        console.log(e)
    }
})


module.exports = router