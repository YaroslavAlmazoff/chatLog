const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const fs = require('fs')
const { secret } = require('../config')
const FileService = require('./FileService')

//Сервис авторизации пользователя
class AuthService {
    //Регистрация пользователя
    async register(req, res) {
        try {
            //Получение результата валидации данных пользователя
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                //Отправка ошибок, если она есть
                res.json({errors}).status(400)
            }
            //Получение данных пользователя из тела запроса
            const user = req.body
            const {name, surname, age, email, country, city, password} = req.body
            //Хеширование пароля
            const hashPassword = bcrypt.hashSync(password)
            //Создание нового пользователя в базе данных
            await User.create({
                name, surname, age, email, country, city, password: hashPassword
            })
            const created = await User.findOne({email})

            const token = jwt.sign(
                {userId: created._id},
                secret,
                {expiresIn: '8h'}
            )
            
            
            fs.mkdir(`../static/userfiles/${created._id}`, err => {
                console.log(err)
            })
            res.json({user, message: 'Success register!', userId: created._id, token})
        } catch(e) {
            console.log(e)
            res.status(400).json({e})
        }

    } 
    //Обновление профиля пользователя
    async update(req, res) {
        try {
            //Получение результата валидации данных пользователя
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                //Отправка ошибок, если она есть
                res.json({errors}).status(400)
            }
            //Получение данных пользователя из тела запроса
            const user = req.body
            const {name, surname, age, email, aboutMe} = req.body
            //Получение ID пользователя
            const id = req.user.userId
            //Обновление профиля пользователя
            await User.findByIdAndUpdate({_id: id}, {name, surname, age, email, aboutMe})
            //Загрузка или обновление изображений аватарки и баннера
            if(req.files) {
                if(req.files.file) {
                    //Генерирование нового имени для файла аватарки
                    const filename1 = uuid.v4() + '.jpg'
                    //Загрузка аватарки на сервер
                    await FileService.insertUserAvatar(req.files.file, id, filename1)
                    //Обновление аватарки
                    await User.findByIdAndUpdate({_id: id}, {avatarUrl: filename1})
                }
                if(req.files.file2) {
                    //Генерирование нового имени для файла баннера
                    const filename2 = uuid.v4() + '.jpg'
                    //Загрузка баннера на сервер
                    await FileService.insertUserBanner(req.files.file2, id, filename2)
                    //Обновление баннера
                    await User.findByIdAndUpdate({_id: id}, {bannerUrl: filename2})
                }
            }
            res.json({user, message: 'Success update!'})
        } catch(e) {
            console.log(e)
            res.status(400).json({e})
        }

    } 
    async login(req, res) {
        try {
            //Получение результата валидации данных пользователя
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                //Отправка ошибок, если она есть
                res.json({errors}).status(400)
                res.end()
                return
            }
            //Получение данных пользователя из тела запроса
            const {email, password} = req.body
            //Поиск пользователя
            const user = await User.findOne({email})
            if(!user) {
                //Если пользователь не найден, отправка ошибки на клиент 
                res.json({error: 'Такого пользователя не существует'})
                res.end()
                return
            }   
            //Проверка пароля на правильность
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                //Если проверка не успешна, отправка ошибки на клиент
                res.json({message: 'Пароль не верный'}).status(400)
                res.end()
                return
            }
            
            const token = jwt.sign(
                {userId: user._id},
                secret,
                {expiresIn: '8h'}
            )

            res.json({user, token, userId: user._id})
        } catch(e) {
            console.log(e)
            res.status(400).json({e})
        }
    }
}

module.exports = new AuthService()