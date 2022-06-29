import React, { useRef, useState, useEffect } from "react";
import "../styles/user.css"
import Notice from "./Notice";
import useFiles from "../../common_hooks/files.hook";
import $, {css} from 'jquery'
import useDate from "../../common_hooks/date.hook";

const UserNav = ({user, isOwner, noticeDisplay, setNoticeDisplay, noticeText, noticeRef}) => {
    const {normalizeBirthDate} = useDate()
    //Верхняя часть страницы пользователя - информация, редактирование профиля
    //Создании ссылки на DOM-элемент стрелочки показать подробную информацию для анимации
    const arrow = useRef(null)
    //Инициализация состояния дисплея текста о пользователе в подробной информации
    const [aboutMeDisplay, setAboutMeDisplay] = useState('none')
    //Перемещение на страницу редактирования страницы пользователя
    const gotoEdit = () => {
        window.location = `/editprofile`
    }
    //Открытие подробной информации - текста о пользователе
    const openAboutMe = () => {
        //Добавление и удаление классов для анимации
        if(aboutMeDisplay === 'none') {
            if(arrow.current.classList.value.includes('user-nav-more-info-backward-animation')) {
                arrow.current.classList.remove('user-nav-more-info-backward-animation')
            }
            //Показ текста о пользователе в подробной информации
            setAboutMeDisplay('inline')
            arrow.current.classList.add('user-nav-more-info-forward-animation')
        } else {
            if(arrow.current.classList.value.includes('user-nav-more-info-forward-animation')) {
                arrow.current.classList.remove('user-nav-more-info-forward-animation')
            }
            //Удаление текста о пользователе в подробной информации
            setAboutMeDisplay('none')
            arrow.current.classList.add('user-nav-more-info-backward-animation')
        }
        
        
    }
    return (
        <div className="user-nav" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + '/userbanners/' + user.avatarUrl})`}}>
            <Notice noticeDisplay={noticeDisplay} setNoticeDisplay={setNoticeDisplay} noticeText={noticeText} noticeRef={noticeRef} />
            <img className="user-avatar" src={process.env.REACT_APP_API_URL + '/useravatars/' + user.avatarUrl} alt="useravatar" />
            <div className="banner">
                <div className="user-nav-info">
                    <h2 className="user-name">{user.name} {user.surname}</h2>
                    <img ref={arrow} onClick={openAboutMe} className="user-nav-more-info" src={require('../img/arrow1.png')} alt="arrow" />
                </div>
                <div className="about-me" style={{display: aboutMeDisplay}}>
                {user.aboutMe ? <h3 className="about-me-text">{user.aboutMe}</h3>
                : <p>Информация о себе отсутствует.</p>    
            }
                    
                </div>
                <div className="user-nav-actions">
                <h2 className="user-age">Дата рождения: {normalizeBirthDate(`${user.age}`)}</h2>
                    {isOwner ? <button onClick={gotoEdit} className="edit-profile">Редактировать профиль</button> : <></>}
                </div>
            </div>
        </div>
    )
}

export default UserNav