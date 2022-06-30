const Notification = require("../models/Notification")
const User = require("../models/User")
const NotificationService = require("./NotificationService")

//Сервис для друзей
class FriendsService {
    async makeFriends(req, res) {
        ///Извлечение ID пользователей
        const user1id = req.user.userId
        const user2id = req.params.to
        //Поиск пользователей
        const user1 = await User.findById(user1id)
        const user2 = await User.findById(user2id)
        //Проверка, есть ли у пользователя 2 в друзьях пользователь 1
        user2.friends.forEach(el => {
            if(el == user1id) {
                res.json({message: 'Пользователь, которому вы отправляете заявку в друзья уже у вас в друзьях.'})
                res.end()
                return
            }
        });
        //Создание уведомления о том что пользователь 1 хочет добавить пользователя 2 в друзья
        const text = `${user1.name} ${user1.surname} хочет добавить вас в друзья.`
        NotificationService.create(user1id, user2id, text, 'friends', 'user')
    }
    async deleteFriend(req, res) {
        //Извлечение ID пользователей
        const user1id = req.user.userId
        const user2id = req.params.to
        //Поиск пользователей
        const user1 = await User.findById(user1id)
        const user2 = await User.findById(user2id)
        //Удаление друга у пользователя 1
        let user1friends = user1.friends 
        const deletingFriendNumber1 = user1.friends.indexOf(user2id)
        delete user1friends[deletingFriendNumber1]
        user1friends = user1friends.filter(el => el != null)
        //Удаление друга у пользователя 2
        let user2friends = user2.friends 
        const deletingFriendNumber2 = user2.friends.indexOf(user1id)
        delete user2friends[deletingFriendNumber2]
        user2friends = user2friends.filter(el => el != null)
        //Обновление поля друзья у пользователей
        await User.findByIdAndUpdate({_id: user1id}, {friends: user1friends})
        await User.findByIdAndUpdate({_id: user2id}, {friends: user2friends})
        //Создание уведомления о том что пользователь 1 удалил пользователя 2 из друзей
        const text = `К сожалению, ${user1.name} ${user1.surname} удалил вас из друзей`
        NotificationService.create(user1id, user2id, text, 'delete', 'user')
        //Удаление заявки в друзья
        let notification = await Notification.findOne({from: user1id, to: user2id, type: 'friends'})
        if(!notification) {
            notification = await Notification.findOne({from: user2id, to: user1id, type: 'friends'})
        }
        if(!notification) {
            res.json({friends: user1friends})
        } else {
            const id = notification._id
            await Notification.findByIdAndDelete(id)
            res.json({friends: user1friends})
        }
    }
    async reply(req, res) {
        //Извлечение ID пользователей 
        const user1id = req.user.userId
        const user2id = req.params.to
        console.log(user1id, user2id)
        //Поиск пользователей
        const user1 = await User.findById(user1id)
        const user2 = await User.findById(user2id)
        //Добавление пользователя 2 в друзья пользователю 1
        const user1friends = user1.friends 
        user1friends.push(user2id)
        //Добавление пользователя 1 в друзья пользователю 2
        const user2friends = user2.friends 
        user2friends.push(user1id)
        //Обновление поля друзей у пользователей
        await User.findByIdAndUpdate({_id: user1id}, {friends: user1friends})
        await User.findByIdAndUpdate({_id: user2id}, {friends: user2friends})
        //Создание уведомления о том что пользователь принял заявку
        const text = `Ваша заявка в друзья к ${user1.name} ${user1.surname} была принята.`
        NotificationService.create(user2id, user1id, text, 'reply', 'user')
        //Удаление заявки в друзья
        await Notification.deleteOne({from: user2id, to: user1id})
        res.json({friends: user1friends})
    }
    async reject(req, res) {
        //Извлечение ID пользователей
        const user1id = req.params.from 
        const user2id = req.params.to
        //Поиск пользователей
        const user1 = await User.findById(user1id)
        const user2 = await User.findById(user2id)
        //Создание уведомления о том что заявка пользователя 2 пользователю 1 была отклонена
        const text = `К сожалению, ваша заявка в друзья к ${user1.name} ${user1.surname} была отклонена.`
        NotificationService.create(user2id, user1id, text, 'reject', 'user')
        //Удаление заявки в друзья
        await Notification.deleteOne({from: user2id, to: user1id})
        res.json({message: 'Success!'})
    }
    async checkFriends(req, res) {
        //Извлечение ID пользователей
        const user1id = req.user.userId
        const user2id = req.params.to
        //Поиск пользователей
        const user1 = await User.findById(user1id)
        const user2 = await User.findById(user2id)
        //Проверка, есть ли у пользователя 2 в друзьях пользователь 1
        for(let i = 0; i < user2.friends.length; i++) {
            if(user2.friends[i] == user1id) {
                //Если да, возвращение на клиент true
                console.log(true)
                res.json({message: true})
                return
            } else {
                //Если нет, возвращение на клиент false
                console.log(false)
                res.json({message: false})
                return
            }
        }

        
    }
    async checkNotifications(req, res) {
        //Извлечение ID пользователей
        const user1id = req.user.userId
        const user2id = req.params.to 
        //Поиск уведомления
        const notice = await Notification.findOne({from: user1id, to: user2id, type: 'friends'})
        //Проверка есть ли такое уведомление
        if(notice) {
            //Если да, возвращение на клиент true
            res.json({message: true})
        } else {
            //Если нет, возвращение на клиент false
            res.json({message: false})
        }
    }
}

module.exports = new FriendsService()