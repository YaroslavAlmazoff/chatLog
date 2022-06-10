const { Router } = require("express")

const AuthService = require('../services/AuthService.js')
const {check} = require('express-validator')
const UserService = require("../services/UserService.js")

const router = Router()
const auth = require('../middleware/auth.middleware')

//Создание роутера для авторизации пользователя
router.post('/auth/register', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('surname', 'Фамилия пользователя не может быть пустой').notEmpty(),
    check('email', 'Некорректный адрес электронной почты').isEmail(),
    check('password', 'Пароль должен быть сильным').isLength({min: 5, max: 20}),
], (req, res) => {
    //Регистрация пользователя
    try {
        AuthService.register(req, res)
    } catch(e) {
        console.log(e)
    }
    
})
router.post('/auth/login', [
    check('email', 'Некорректный адрес электронной почты').isEmail(),
    check('password', 'Пароль должен быть сильным').isLength({min: 5, max: 20}),
], (req, res) => {
    //Логин пользователя
    try {
        AuthService.login(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/users', (req, res) => {
    //Все пользователи
    try {
        UserService.findsAllUsers(req, res)
    } catch(e) {
        console.log(e)
    }
})
router.get('/user', auth, (req, res) => {
    //Один конкретный пользователь
    try {
        UserService.findUser(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.get('/user/:id', (req, res) => {
    //Один конкретный пользователь
    try {
        UserService.findUserById(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.get('/getuserpage/:email', (req, res) => {
    //Получение ID пользователя
    try {
        UserService.getUserID(req, res)
    } catch(e) {
        console.log(e)
    } 
})
router.post('/editprofile', auth, (req, res) => {
    //Редактироавние профиля
    try {
        AuthService.update(req, res)
    } catch(e) {
        console.log(e)
    } 
})

module.exports = router