const ReadFileService = require("./ReadFileService")

class GetFilesService {
    filesDir = '../static/'
    
    getFoto(req, res) {
        const imageUrl = req.params.url
        const folder = 'userfotos/'
        const filepath = this.filesDir + folder + imageUrl
        ReadFileService.readFile(res, filepath)
    }
    getPost(req, res) {
        const imageUrl = req.params.url
        const folder = 'articles/'
        const filepath = this.filesDir + folder + imageUrl
        ReadFileService.readFile(res, filepath)
    }
    getVideo(req, res) {
        const imageUrl = req.params.url
        const folder = 'uservideos/'
        const filepath = this.filesDir + folder + imageUrl
        ReadFileService.readFile(res, filepath)
    }
    getAvatar(req, res) {
        const imageUrl = req.params.url
        const folder = 'useravatars/'
        const filepath = this.filesDir + folder + imageUrl
        ReadFileService.readFile(res, filepath)
    }
    getBanner(req, res) {
        const imageUrl = req.params.url
        const folder = 'userbanners/'
        const filepath = this.filesDir + folder + imageUrl
        ReadFileService.readFile(res, filepath)
    }
}

module.exports = new GetFilesService()