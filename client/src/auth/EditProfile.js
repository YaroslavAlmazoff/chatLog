import React, { useEffect, useState, useRef, useContext } from 'react'
import "./styles/form.css"
import "./styles/user.css"
import api from "./api/auth"
import ImagePreviewEdit1 from './parts/ImagePreviewEdit1'
import ImagePreviewEdit2 from './parts/ImagePreviewEdit2'
import { useNavigate } from 'react-router'
import { AuthContext } from '../context/AuthContext'

const EditProfile = () => {
    //Страница редактирования профиля
    const auth = useContext(AuthContext)
    //Функция для навигации
    let navigate = useNavigate()
    //Получение ссылок на файловые поля ввода
    const fileRef = useRef()
    const fileRef2 = useRef()
    //Инициализация состояния для изображений предпросмотра аватарки и баннера
    const [file, setFile] = useState('')
    const [file2, setFile2] = useState('')
    //Инициализация состояний дисплея и url изображений предпросмотра аватарки и баннера
    const [imagePreviewDisplay1, setImagePreviewDisplay1] = useState('none')
    const [imagePreviewUrl1, setImagePreviewUrl1] = useState('')
    const [imagePreviewDisplay2, setImagePreviewDisplay2] = useState('none')
    const [imagePreviewUrl2, setImagePreviewUrl2] = useState('')
    //Инициализация состояний информации о пользователе
    const [name, setName] = useState('')
    const [surname, setSurName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [aboutMe, setAboutMe] = useState('Напишите о себе')
    //Эмитирование открытия загрузки изображения для аватарки
    const emitOpen = () => {
        fileRef.current.click()
    }
    //Эмитирование открытия загрузки изображения для баннера
    const emitOpen2 = () => {
        fileRef2.current.click()
    }
    //Получение изображения для аватарки
    const getFile = async (e) => {
        let file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {
            setImagePreviewDisplay1('block')
            setImagePreviewUrl1(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile(file)
    }
    //Получение изображения для баннера
    const getFile2 = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImagePreviewDisplay2('block')
            setImagePreviewUrl2(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile2(file)
    }
    useEffect(() => {
        //Получение информацию о пользователе чтобы загрузить её в поля ввода
        const getUserData = async () => {
            console.log(auth.token)
            const response = await api.get(`/api/user`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            const user = response.data.user
            //Изменение состояний информации о пользователе
            setName(user.name)
            setSurName(user.surname)
            setAge(user.age)
            setEmail(user.email)
            setAboutMe(user.aboutMe)
        }
        getUserData()
    }, [auth])
    //Обновление профиля
    const updateHandler = async () => {
        //Инициализация formdata для загрузки на сервер изображений
        const formData = new FormData()
        //Добавление информацию о пользователе в formdata
        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('age', age)
        formData.append('email', email)
        formData.append('aboutMe', aboutMe)
        formData.append('file', file)
        formData.append('file2', file2)
        //Отправка запроса на обновление профиля
        await api.post(`/api/editprofile`, formData, {headers: 
            {'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`}
        })
        //Перемещение на профиль пользователя
        navigate(`/user/${auth.userId}`)
    }
    return (
        <div className="form">
            <h2 className="form-title">Обновление профиля</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" type="text" className="form-field" />
            <input value={surname} onChange={(e) => setSurName(e.target.value)} placeholder="Введите фамилию" type="text" className="form-field" />
            <p style={{color: 'white'}}>Выберите дату рождения:</p>
            <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Выберите дату рождения" type="date" className="form-field" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите свой email" type="email" className="form-field" />
            <textarea maxLength={100} className='form-area' value={aboutMe} onChange={(e) => setAboutMe(e.target.value)}></textarea>
            <input onChange={(e) => getFile(e)} ref={fileRef} type="file" />
            <button onClick={(e) => emitOpen(e)} className="submit">Добавить аватар</button>
            <ImagePreviewEdit1 imagePreviewUrl1={imagePreviewUrl1} imagePreviewDisplay1={imagePreviewDisplay1} />
            <input onChange={(e) => getFile2(e)} ref={fileRef2} type="file" />
            <button onClick={(e) => emitOpen2(e)} className="submit">Добавить баннер</button>
            <p style={{color: 'yellow', fontSize: '16pt'}}>Если у вас стоит блокировщик рекламы, пожалуйста, отключите его на этом сайте. Он мешает корректной работе соцсети.</p>
            <ImagePreviewEdit2 imagePreviewUrl2={imagePreviewUrl2} imagePreviewDisplay2={imagePreviewDisplay2} />
            <button onClick={updateHandler} className="submit">Обновить профиль</button>
        </div>
    )
}

export default EditProfile