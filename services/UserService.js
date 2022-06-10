const User = require("../models/User")

//Сервис для взаимодействие с пользователями
class UserService {
    //Поиск пользователя по ID
    async findUser(req, res) {
        const id = req.user.userId
        const user = await User.findById(id)
        //Возвращение данных пользователя на клиент
        res.json({user})
    }
    async findUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id)
        //Возвращение данных пользователя на клиент
        res.json({user})
    }
    //Поиск всех пользователей 
    async findsAllUsers(req, res) {
        const users = await User.find()
        //Возвращение данных пользователей на клиент
        res.json({users})
    }
    async getUserID(req, res) {
        //Получение ID пользователя
        const user = await User.findOne({email: req.params.email})
        //Возвращение ID пользователя на клиент
        res.json({id: user._id})
    }
}

module.exports = new UserService