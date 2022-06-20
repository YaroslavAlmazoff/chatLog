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
router.get('/getmessages', (req, res) => {
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
router.get('/getvisits', (req, res) => {
    try {
        AdminService.getVisits(req, res)
    } catch (e) {
        console.log(e)
    }
})


module.exports = router