const { Router } = require("express")
const AdminService = require("../services/AdminService")
const router = Router()

router.post('/sendmessage', (req, res) => {
    try {
        AdminService.sendMessage(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/messages', (req, res) => {
    try {
        AdminService.getMessages(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/setvisit', (req, res) => {
    try {
        AdminService.setVisit(req, res)
    } catch (e) {
        console.log(e)
    }
})
router.get('/visits', (req, res) => {
    try {
        AdminService.getVisits(req, res)
    } catch (e) {
        console.log(e)
    }
})


module.exports = router