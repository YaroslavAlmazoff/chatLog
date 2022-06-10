import React, { useContext } from "react"
import {NavLink} from "react-router-dom"
import './styles/header.css'
import {useRef} from 'react'
import { AuthContext } from "../context/AuthContext"

const Header = () => {
    const auth = useContext(AuthContext)
    //Компонент верхней части приложения
    //Создание ссылок на ссылки:)
    const linkRef1 = useRef('')
    const linkRef2 = useRef('')
    const linkRef3 = useRef('')
    const linkRef4 = useRef('')
    const linkRef5 = useRef('')
    const linkRef6 = useRef('')
    const linkRef7 = useRef('')
    const linkRef8 = useRef('')
    const linkRef9 = useRef('')
    //Добавление классов ссылкам в зависимости от того на какой странице сейчас пользователь
    const visit = (ref) => {
        ref.current.classList.add('link-visited')
        ref.current.click()
    }
    return(
        <div className="header">
            <h2 className="logo">CHATLOG.RU</h2>
            <div className="links">
                {auth.isAuthenticated 
                ?   <div className="links">
                        <NavLink ref={linkRef1} onClick={() => visit(linkRef1)} className="link" to="/">Главная</NavLink>
                        <NavLink ref={linkRef8} onClick={() => visit(linkRef8)} className="link" to={`/user/${auth.userId}`}>Мой профиль</NavLink>
                        <NavLink ref={linkRef4} onClick={() => visit(linkRef4)} className="link" to="/messages">Сообщения</NavLink>
                        <NavLink ref={linkRef7} onClick={() => visit(linkRef7)} className="link" exact="true" to="/users">Люди</NavLink>
                    </div>
                : <div>
                    <NavLink ref={linkRef5} onClick={() => visit(linkRef5)} className="link" to="/login">Войти</NavLink>
                    <NavLink ref={linkRef6} onClick={() => visit(linkRef6)} className="link" to="/register">Регистрация</NavLink>
                </div>}
                
                {/*<NavLink ref={linkRef9} onClick={() => visit(linkRef9)} className="link" to={'/news'}>Новости</NavLink>*/}
            </div>
        </div>
    )
}
export default Header