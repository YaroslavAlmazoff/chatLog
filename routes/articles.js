const { Router } = require("express")

const PostService = require('../services/PostService.js')
const ArticleService = require("../services/ArticleService.js")
const CommentService = require("../services/CommentService.js")
const FotoService = require("../services/FotoService.js")
const ReactionsService = require("../services/ReactionsService.js")
const UserVideoService = require("../services/UserVideoService.js")
const router = Router()

const auth = require('../middleware/auth.middleware')

//Создание роутера для постов
router.get('/post/:id', async (req, res) => {
    //Получение поста пользователя для показа на отдельной странице
    try {
        PostService.receive(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/fotobyurl/:url', (req, res) => {
    try {
        FotoService.receiveByUrl(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.get('/video/:id', (req, res) => {
    try {
        UserVideoService.receiveOneVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.post('/sendcomment/:id', auth, async (req, res) => {
    //Отправка комментария
    try {
        CommentService.send(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/getcomment/:id', async (req, res) => {
    //Получение всех комментариев
    try {
        CommentService.receive(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/comm', async (req, res) => {
    //Увеличение количестива комментариев
    try {
        ReactionsService.comment(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.delete('/deleteuserfoto/:url', (req, res) => {
    //Удаление фотографии пользователя
    try {
        FotoService.delete(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.delete('/deleteuserpost/:id', (req, res) => {
    //Удаление поста пользователя
    try {
        ArticleService.deleteUserPost(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.delete('/video/:id', (req, res) => {
    try {
        UserVideoService.delete(req, res)
    } catch(e) {
        console.log(e)
    }
})




router.post('/like', auth, async (req, res) => {
    //Увеличение количестива лайков
    try {
        ReactionsService.like(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/likefoto/:url', auth, (req, res) => {
    try {
        ReactionsService.likeFoto(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.post('/likevideo', auth, (req, res) => {
    try {
        ReactionsService.likeVideo(req, res)
    } catch(e) {
        console.log(e)
    } 
})


router.delete(`/deletecomment/:id/:url`, (req, res) => {
    try {
        CommentService.deleteComment(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.delete('/deletefotocomment/:id/:url', (req, res) => {
    try {
        CommentService.deleteFotoComment(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.delete('/deletevideocomment/:id/:url', (req, res) => {
    try {
        CommentService.deleteVideoComment(req, res)
    } catch(e) {
        console.log(e)
    } 
})


router.post('/commentfoto/:url', auth, (req, res) => {
    try {
        CommentService.commentFoto(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/fotocomments/:url', (req, res) => {
    try {
        CommentService.receiveFotoComments(req, res)
    } catch(e) {
        console.log(e)
    }  
})
router.get('/fotocomm/:url', (req, res) => {
    try {
        ReactionsService.plusFotoComm(req, res)
    } catch(e) {
        console.log(e)
    }    
})


router.post('/commentvideo/:url', auth, (req, res) => {
    try {
        CommentService.commentVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/videocomments/:url', (req, res) => {
    try {
        CommentService.receiveVideoComments(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/videocomm/:url', (req, res) => {
    try {
        ReactionsService.plusVideoComm(req, res)
    } catch(e) {
        console.log(e)
    }    
})

module.exports = router