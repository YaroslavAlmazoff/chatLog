import React, { useContext, useState, useRef } from 'react'
import "./styles/form.css"
import api from "./api/auth"
import { useNavigate } from 'react-router'
import {AuthContext} from '../context/AuthContext'
import Notice from './parts/Notice'

const Login = () => {
    let ref1 = useRef(null)
    let ref2 = useRef(null)
    let ref3 = useRef(null)
    let ref4 = useRef(null)
    const [noticeText, setNoticeText] = useState('')
    const [noticeDisplay, setNoticeDisplay] = useState('none')
    const noticeRef = useRef(null)
    //Страница логина
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()
    //Инициализация состояний электронной почты и пароля пользователя
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //Вход пользователя
    const loginHandler = async () => {
        //Создание объекта для отправки на сервер
        const user = {
            email, password
        }
        //Отправка запроса на вход пользователя
        const response = await api.post('/api/auth/login', user)
        auth.login(response.data.token, response.data.userId)
        //Запись в локальном хранилище браузера ID пользователя
        if(response.data.token && response.data.userId) {
            navigate(`/home`)
        } else {
            setNoticeText('Введены некорректные данные')
            setNoticeDisplay('block')
        }
        
    }
    const theme = (theme, ref, num) => {
        localStorage.setItem('theme', theme)
        ref.current.className = 'theme-button-wb'
        ref.current.classList.add('theme-button-bg'+num)
    }
    return (
        <div>
            <Notice noticeText={noticeText} noticeDisplay={noticeDisplay} noticeRef={noticeRef} />
            <div className="form">
                <h2 className="form-title">Вход</h2>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите свой email" type="email" className="form-field" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль" type="password" className="form-field" />
                <p className="theme-title">Выберите тему для домашней страницы</p>
            <button ref={ref1} onClick={() => theme('city', ref1, 1)} className='theme-button theme-button-bg1'>Ночной Город</button>
            <button ref={ref2} onClick={() => theme('mountain', ref2, 2)} className='theme-button theme-button-bg2'>Горы</button>
            <button ref={ref3} onClick={() => theme('nature', ref3, 3)} className='theme-button theme-button-bg3'>Природа</button>
            <button ref={ref4} onClick={() => theme('space', ref4, 4)} className='theme-button theme-button-bg4'>Космос</button>
                <button onClick={loginHandler} className="submit">Войти</button>
            </div>
        </div>
        
    )
}

export default Login