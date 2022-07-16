//Подключение библиотек
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const config = require('config')
//Подключение роутеров
const articlesRouter = require('./routes/articles')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const messagesRouter = require('./routes/messages')
const cloudRouter = require('./routes/cloud')
const filesRouter = require('./routes/files')
const adminRouter = require('./routes/admin')
const publicRouter = require('./routes/publics')
const photoRouter = require('./routes/photos')
const innerAdRouter = require('./routes/innerAds')
//Создание сервера
const app = express()
//Подключение необходимых middlewares 
app.use(cors())
app.use(fileUpload())
app.use(express.json({extended: true}))
app.use(express.urlencoded({extended: true}))

app.use('/api', articlesRouter)
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', messagesRouter)
app.use('/api/cloud', cloudRouter)
app.use('/api/files', filesRouter)
app.use('/api/admin', adminRouter)
app.use('/api/public', publicRouter)
app.use('/api/photo', photoRouter)
app.use('/api/innerad', innerAdRouter)

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.use(express.static(path.join(__dirname, '..', 'static')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


//Запуск сервера
const start = async () => {
    try {
        //Подключение у базе данных
        mongoose.connect(config.get('CONNECTION_URL'), {useNewUrlParser: true})
        //Прослушивание порта
        app.listen(config.get('PORT'), () => console.log(`Server has been started on port ${config.PORT}...`))
    } catch(e) {
        console.log('Server Error: ', e.message)
        process.exit(1)
    }
}
start()
