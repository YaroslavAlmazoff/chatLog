const Notification = require("../models/Notification")

//Сервис для уведомлений
class NotificationService {
    //Создание нового уведомления
    async create(user1id, user2id, text, type, postType, postID) {
        await Notification.create({
            title: text,
            type,
            from: user1id,
            to: user2id,
            postType, 
            postID,
            checked: false
        })
    }
    async check(req, res) {
        const user = req.params.id
        const notifications = await Notification.find({to: user})
        console.log(notifications[notifications.length - 1], notifications)
        await Notification.findByIdAndUpdate(notifications[notifications.length - 1]._id, {checked: true})
        console.log('checked')
        res.json({msg: 'success'})
    }
    //Возращение уведомлений пользователя на клиент
    async notify(req, res) {
        const userid = req.params.id
        //Поиск уведомлений
        const notifications = await Notification.find({to: userid})
        console.log(notifications)
        //Возращение уведомлений пользователя на клиент
        res.json({notifications})
    }
    //Удаление уведомления
    async delete(req, res) {
        //Получение ID пользователя и текста уведомления
        const userid = req.user.userId
        const title = req.params.title
        //Поиск уведомления
        const needNotice = await Notification.findOne({to: userid, title})
        //Получение ID нужного уведомления
        const id = needNotice._id
        //Поиск и удаление уведомления
        await Notification.findByIdAndDelete(id)
        res.json({message: 'Уведомление удалено'})
    }
}

module.exports = new NotificationService()