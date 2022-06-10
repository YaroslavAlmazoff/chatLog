const UserPost = require('../models/UserPost.js')

//Сервис для постов пользователя
class PostService {
    //Возвращение определённого поста
    async receive(req, res) {
        try {
            //Поиск нужного поста
            const needArticle = await UserPost.findById(req.params.id)
            //Возвращение поста на клиент
            res.json({msg: req.url, params: req.params, article: needArticle})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new PostService()