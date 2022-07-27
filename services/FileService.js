const ImageService = require('../services/ImageService.js')
const uuid = require('uuid')
const path = require('path')
const UserPost = require('../models/UserPost.js')
const UserFoto = require('../models/UserFoto.js')

//Сервис для работы с файлами
class FileService {
    //Загрузка файла изображения поста
    async insertUserPostImage(file, id, filename) {
        ImageService.saveFile(file, filename, 'articles')
    }
    //Загрузка файла фотографии
    async insertUserFoto(file, id, filename) {
        ImageService.saveFile(file, filename, 'userfotos')
        return filename
    }
    //Загрузка файла аватаорки
    async insertUserAvatar(file, id, filename) {
        ImageService.saveFile(file, filename, 'useravatars')
        return filename
    }
    //Загрузка файла баннера
    async insertUserBanner(file, id, filename) {
        ImageService.saveFile(file, filename, 'userbanners')
        return filename
    }
    //Загрузка файла видео
    async insertUserVideo(file, id, filename) {
        ImageService.saveFile(file, filename, 'uservideos')
        return filename
    }
    //Загрузка файла изображения из сообщения
    async insertMessageFoto(file, id, filename) {
        ImageService.saveFile(file, filename, 'messagefotos')
        return filename
    }
    //Загрузка файла видео из сообщения
    async insertMessageVideo(file, id, filename) {
        ImageService.saveFile(file, filename, 'messagevideos')
        return filename
    }
    async insertPublicAvatar(file, filename) {
        ImageService.saveFile(file, filename, 'publicavatars')
        return filename
    }
    async insertPublicBanner(file, filename) {
        ImageService.saveFile(file, filename, 'publicbanners')
        return filename
    }
    async insertPublicFoto(file, filename) {
        ImageService.saveFile(file, filename, 'publicfotos')
        return filename
    }
    async insertPublicPost(file, filename) {
        ImageService.saveFile(file, filename, 'publicposts')
        return filename
    }
    async insertPublicVideo(file, filename) {
        ImageService.saveFile(file, filename, 'publicvideos')
        return filename
    }
    async insertPhoto(file, filename) {
        ImageService.saveFile(file, filename, 'photos')
        return filename
    }
    async insertInnerAdImage(file, filename) {
        ImageService.saveFile(file, filename, 'inneradimages')
        return filename
    }
    async insertAdImage(file, filename) {
        ImageService.saveFile(file, filename, 'ads')
        return filename
    }
    async insertVideohostChannelAvatar(file, filename) {
        ImageService.saveFile(file, filename, 'channelavatars')
        return filename
    }
    async insertVideohostChannelBanner(file, filename) {
        ImageService.saveFile(file, filename, 'channelbanners')
        return filename
    }
    async insertVideohostVideoPreview(file, filename) {
        ImageService.saveFile(file, filename, 'videopreviews')
        return filename
    }
    async insertVideohostVideo(file, filename) {
        ImageService.saveFile(file, filename, 'videohostvideos')
        return filename
    }

}

module.exports = new FileService()
