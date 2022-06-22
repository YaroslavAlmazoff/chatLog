import React, { useState, useContext, useRef, useEffect } from 'react'
import "./styles/form.css"
import api from "./api/auth"
import { useNavigate } from 'react-router'
import {AuthContext} from '../context/AuthContext'
import Notice from './parts/Notice'

const Register = () => {
    useEffect(() => {
        localStorage.setItem('adblock', true)
    }, [])
    let ref1 = useRef(null)
    let ref2 = useRef(null)
    let ref3 = useRef(null)
    let ref4 = useRef(null)
    const [noticeText, setNoticeText] = useState('')
    const [noticeDisplay, setNoticeDisplay] = useState('none')
    const noticeRef = useRef(null)
    //Страница регистрации пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()
    //Инициализация состояний информации о пользователе
    const [name, setName] = useState('')
    const [surname, setSurName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    //Регистрация пользователя
    const registerHandler = async () => {
        if(password !== password2) {
            setNoticeText('Пароли не совпадают')
            setNoticeDisplay('block')
        }
        //Создание объекта для отправки на сервер
        const user = {
            name, surname, age, email, country, city, password
        }
        //Отправка запроса на регистрацию пользователя
        const response = await api.post('/api/auth/register', user)
        auth.login(response.data.token, response.data.userId)
        //Получение страцицы пользователя по email
        const response2 = await api.get(`/api/getuserpage/${response.data.user.email}`)
        //Запись в локальное хранилище браузера ID пользователя
         //Перемещение на профиль пользователя
        localStorage.setItem('registered', true)
        navigate(`/home`)
    }
    const theme = (theme, ref, num) => {
        localStorage.setItem('theme', theme)
        ref.current.className = 'theme-button-wb'
        ref.current.classList.add('theme-button-bg'+num)
    }
    return (
        <div className="form">
            <h2 className="form-title">Регистрация</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введите имя" type="text" className="form-field" />
            <input value={surname} onChange={(e) => setSurName(e.target.value)} placeholder="Введите фамилию" type="text" className="form-field" />
            <p style={{color: 'white'}}>Введите дату рождения</p>
            <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Выберите возраст" type="date" className="form-field" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите свой email" type="email" className="form-field" />
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Введите свою страну (необязательно)" type="text" className="form-field" />
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Введите свой город (необязательно)" type="text" className="form-field" />
            <p className="theme-title">Выберите тему для домашней страницы</p>
            <button ref={ref1} onClick={() => theme('city', ref1, 1)} className='theme-button theme-button-bg1'>Ночной Город</button>
            <button ref={ref2} onClick={() => theme('city', ref2, 2)} className='theme-button theme-button-bg2'>Горы</button>
            <button ref={ref3} onClick={() => theme('city', ref3, 3)} className='theme-button theme-button-bg3'>Природа</button>
            <button ref={ref4} onClick={() => theme('city', ref4, 4)} className='theme-button theme-button-bg4'>Космос</button>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Придумайте пароль" type="password" className="form-field" />
            <input value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Повторите пароль" type="password" className="form-field" />
            <p style={{color: 'yellow', fontSize: '16pt'}}>Если у вас стоит блокировщик рекламы, пожалуйста, отключите его на этом сайте. Он мешает корректной работе соцсети.</p>
            <button onClick={registerHandler} className="submit">Регистрация</button>
        </div>
    )
}

export default Register