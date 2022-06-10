const User = require("../models/User")
const UserPost = require("../models/UserPost")
const UserVideo = require("../models/UserVideo")

class NewsService {
    async setNews(id, userid) {
        console.log(id, userid)
        const user = await User.findById(userid)
        console.log(user)
        const news = user.news
        news.push(id)
        await User.findByIdAndUpdate(userid, {news})
    }
    async getNews(req, res) {
        const userid = req.user.userId
        const user = await User.findById(userid)
        const news = user.news
        console.log(userid, user, news)
        const posts = []
        const videos = []

        /*for(let i = 0; i <= news.length; i++) {
            console.log(news, news[i], 'beneath')
            if(await UserPost.findById(news[i])) {
                posts.push(news[i])
            } else if(await UserVideo.findById(news[i])) {
                videos.push(news[i])
            }
        }*/
        console.log(news)

        res.json({news})
    }
}

module.exports = new NewsService()