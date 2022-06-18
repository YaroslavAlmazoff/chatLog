const { Router } = require("express")
const CloudService = require("../services/CloudService")
const router = require("./auth")
const auth = require('../middleware/auth.middleware')

router.post('/upload', auth, (req, res) => {
    try {
        CloudService.upload(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/files', auth, (req, res) => {
    try {
        CloudService.getFiles(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/delete/:filename', auth, (req, res) => {
    try {
        CloudService.deleteFile(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/filetext/:filename', auth, (req, res) => {
    try {
        CloudService.fileText(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/hardfiletext/:filename', auth, (req, res) => {
    try {
        CloudService.hardFileText(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/file/:id', (req, res) => {
    try {
        CloudService.fileById(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/publicfile/:filename', auth, (req, res) => {
    try {
        CloudService.publicFile(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/sendfile/:user/:filename', auth, (req, res) => {
    try { 
        CloudService.sendFile(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getsentfile/:id', (req, res) => {
    try { 
        CloudService.getSentFile(req, res)
    } catch(e) {
        console.log(e)
    }
})


//Создание роутера для авторизации пользователя


module.exports = router