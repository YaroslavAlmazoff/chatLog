const UserPost = require('../models/UserPost.js')
const FileService = require('../services/FileService.js')
const uuid = require('uuid')
const path = require('path')
const ImageService = require('./ImageService.js')
const User = require('../models/User.js')
const NewsService = require('./NewsService.js')

//Сервис постов пользователя
class ArticleService {
    //Создание поста пользователя
    async createUserPost(req, res) {
        try {
            //Получение поста из тела запроса и ID пользователя из параметров
            const {title, date, likes, comments} = req.body
            const userid = req.user.userId
            const user = await User.findById(userid)
            const friends = user.friends

            //Генерирование нового имени для файла изображения поста
            const filename = uuid.v4() + '.jpg'
            //Создание нового поста в базе данных
            if(req.files) {
                UserPost.create({
                    title, date, likes, comments, imageUrl: filename, user: userid
                }).then(() => {
                    //Когда новый пост создался в базе данных, получение ID поста и загрузка изображения на диск
                    UserPost.findOne({date}).then((newValue) => {
                        const id = newValue._id
                        friends.forEach(el => {
                            NewsService.setNews(id, el)
                        })
                        FileService.insertUserPostImage(req.files.file, id, filename)
                        res.json({id})
                    })
                })
            } else {
                UserPost.create({
                    title, date, likes, comments, imageUrl: 'none.png', user: userid
                }).then(() => {
                    //Когда новый пост создался в базе данных, получение ID поста и загрузка изображения на диск
                    UserPost.findOne({date}).then((newValue) => {
                        const id = newValue._id
                        friends.forEach(el => {
                            NewsService.setNews(id, el)
                        })
                        res.json({id})
                    })
                })
            }
            
        } catch(e) {
            console.log(e)
        }
    }
    //Получение всех постов пользователя
    async getUserPosts(req, res) {
        //Получение ID пользователя из параметров
        const user = req.params.id
        //Поиск постов
        const articles = await UserPost.find({user})
        //Возвращение на клиент посты пользователя
        res.json({articles})
    }
    //Удаление поста пользователя
    async deleteUserPost(req, res) {
        //Получение ID поста из параметров
        const id = req.params.id
        const post = await UserPost.findById(id)
        const image = post.imageUrl
        const filepath = path.resolve('..', 'static', 'articles', image)
        ImageService.deleteFile(filepath)
        //Удаление поста пользователя
        await UserPost.findByIdAndDelete(id)
        res.json({message: 'Запись удалена.'})
    }
}

module.exports = new ArticleService()