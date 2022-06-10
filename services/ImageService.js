const path = require('path')
const fs = require('fs')

//Сервис для взаимодействия с файлами
class ImageService {
    //Генерация рандомного числа
    random() {
        return Math.round(Math.random() * 10000)
    }
    //Сохранение файла на диск
    saveFile(file, filename, folder) {
        //Построение пути, по которому будет перемещён файл
        const filePath = path.resolve('..', 'static', folder, filename)
        file.mv(filePath)
        return filename
    }
    async deleteFile(filepath) {
        fs.unlink(filepath, err => {
            if(err) throw err
            console.log('Файл удалён')
        })
    }
}

module.exports = new ImageService()
