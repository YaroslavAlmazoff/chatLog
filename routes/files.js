const { Router } = require("express")
const GetFilesService = require("../services/GetFilesService")
const router = Router()

router.get('/foto/:url', (req, res) => {
    try {
        GetFilesService.getFoto(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/post/:url', (req, res) => {
    try {
        GetFilesService.getPost(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/video/:url', (req, res) => {
    try {
        GetFilesService.getVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/avatar/:url', (req, res) => {
    try {
        GetFilesService.getAvatar(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/banner/:url', (req, res) => {
    try {
        GetFilesService.getBanner(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/file/:user/:url', (req, res) => {
    try {
        GetFilesService.getFile(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/icon/:name', (req, res) => {
    try {
        GetFilesService.getFileIcon(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/messagefoto/:url', (req, res) => {
    try {
        GetFilesService.getMessageFoto(req, res)
    } catch(e) {
        console.log(e)
    }
})


//Создание роутера для получения файлов


module.exports = router