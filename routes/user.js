const { Router } = require("express")

const ArticleService = require("../services/ArticleService.js")
const FotoService = require("../services/FotoService.js")
const FriendsService = require("../services/FriendsService.js")
const NotificationService = require("../services/NotificationService.js")
const UserVideoService = require("../services/UserVideoService.js")
const VisitService = require('../services/VisitService.js')

const auth = require('../middleware/auth.middleware')
const NewsService = require("../services/NewsService.js")

const router = Router()

//Создание роутера для действий пользователя
router.post('/createuserpost', auth, (req, res) => {
    //Создание поста
    try {
        ArticleService.createUserPost(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/uploaduservideo', auth, (req, res) => {
    try {
        UserVideoService.uploadVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.post('/createuserfoto', auth, (req, res) => {
    //Загрузка фотографии
    try {
        FotoService.create(req, res)
    } catch(e) {
        console.log(e)
    } 
})


router.get('/getuserposts/:id', (req, res) => {
    //Все посты пользователя
    try {
        ArticleService.getUserPosts(req, res)
    } catch(e) {
        console.log(e)
    }  
})
router.get('/getuserfotos/:id', (req, res) => {
    //Все фотографии пользователя
    try {
        FotoService.receive(req, res)
    } catch(e) {
        console.log(e)
    }  
})
router.get('/getuservideos/:id', (req, res) => {
    try {
        UserVideoService.receiveVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.get('/makefriends/:to', auth, (req, res) => {
    //Заявка в друзья
    try {
        FriendsService.makeFriends(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.get('/reply/:to', auth, (req, res) => {
    //Принятие заявки в друзья
    try {
        FriendsService.reply(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/checkfriends/:to', auth, (req, res) => {
    //Проверка, являются ли два пользователя друзьями
    try {
        FriendsService.checkFriends(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.delete('/deletefriend/:to', auth, (req, res) => {
    //Удаление из друзей
    try {
        FriendsService.deleteFriend(req ,res)
    } catch(e) {
        console.log(e)
    } 
})


router.get('/getnotifications/:id', (req, res) => {
    //Получение уведомлений пользователя
    try {
        NotificationService.notify(req, res)
    } catch(e) {
        console.log(e)
    }  
})
router.get('/checknotifications/:to', auth, (req, res) => {
    //Проверка, отправил ли пользователь заявку в друзья другому пользователю
    try {
        FriendsService.checkNotifications(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.delete('/deletenotification/:title', auth, (req, res) => {
    //Удаление уведомления
    try {
        NotificationService.delete(req, res)
    } catch(e) {
        console.log(e)
    } 
})


router.get('/visit/:toid', auth, (req, res) => {
    try {
        VisitService.visitProfile(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/visitpost/:postid', auth, (req, res) => {
    try {
        VisitService.visitPost(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/visitfoto/:postid', auth, (req, res) => {
    try {
        VisitService.visitFoto(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/visitvideo/:postid', auth, (req, res) => {
    try {
        VisitService.visitVideo(req, res)
    } catch(e) {
        console.log(e)
    }
})


router.get('/news', auth, (req, res) => {
    NewsService.getNews(req, res)
})

module.exports = router