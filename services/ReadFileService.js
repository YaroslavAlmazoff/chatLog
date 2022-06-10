const fs = require('fs')

class ReadFileService {
    toBase64(buffer) {
        return Buffer.from(buffer).toString('base64')
    }
    readFile(res, filepath) {
        fs.readFile(filepath, (error, data) => {
            if(error) {
                console.log(error)
            } else {
                const base64 = this.toBase64(data)
                res.json({file: base64})
            }
        })
    }
}

module.exports = new ReadFileService()