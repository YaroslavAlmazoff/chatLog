const UserFoto = require('../models/UserFoto')
const FileService = require('./FileService')
const uuid = require('uuid')
const path = require('path')
const ImageService = require('./ImageService')

//Сервис фотографий пользователя
class FotoService {
    //Новая фотография пользователя
    create(req, res) {
        try {
            //Генерирование нового имени для файла фотографии
            const filename = uuid.v4() + '.jpg'
            //Получение данных фотографии из тела запроса и ID пользователя из параметров
            const {date, likes, comments} = req.body
            const user = req.user.userId
            //Создание новой фотографии в базе данных
            UserFoto.create({
                date, likes, comments, imageUrl: filename, user
            }).then(() => {
                //Когда фотография создалась, получение ID фотографии и загрузка фотографии на диск
                UserFoto.findOne({date}).then((newValue) => {
                    const id = newValue._id
                    FileService.insertUserFoto(req.files.file, id, filename)
                    res.json({id})
                })
            })
        } catch(e) {
            console.log(e)
        }
    }
    //Возвращение фотографий пользователя
    async receive(req, res) {
        //Получение ID пользователя
        const user = req.params.id
        //Поиск фотографий
        const fotos = await UserFoto.find({user})
        //Возвращение фотографий на клиент
        res.json({fotos})
    }
    //Удаление фотографии
    async delete(req, res) {
        //Получение ID пользователя
        const url = req.params.url
        const foto = await UserFoto.findOne({imageUrl: url})
        const image = foto.imageUrl
        const filepath = path.resolve('..', 'static', 'userfotos', image)
        ImageService.deleteFile(filepath)
        //Поиск фотографии и её удаление
        await UserFoto.deleteOne({imageUrl: url})
        res.json({message: 'Фотография удалена.'})
    }
    async receiveByUrl(req, res) {
        const imageUrl = req.params.url
        const foto = await UserFoto.findOne({imageUrl})
        res.json({foto})
    }
}

module.exports = new FotoService()