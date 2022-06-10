import React, { useState, useEffect } from "react";
import "../../styles/user.css"
import "../../styles/user-mobile.css"
import Notice from "./../Notice";
import useFiles from "../../../common_hooks/files.hook";
import $, {css} from 'jquery'
import useDate from "../../../common_hooks/date.hook";

const Nav = ({user, noticeDisplay, setNoticeDisplay, noticeText, noticeRef}) => {
    const {normalizeBirthDate} = useDate()
    //Верхняя часть страницы пользователя - информация, редактирование профиля
    const {getAvatar} = useFiles()
    const {getBanner} = useFiles()

    const [avatarCode, setAvatarCode] = useState('')
    useEffect(() => {
        getAvatar(user.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        }) 
    }, [user])
    useEffect(() => {
        getBanner(user.bannerUrl).then((data) => {
            $(".user-nav").css("background-image", "url('data:image/png;base64," + data + "')")
            if(window.innerWidth < 500) {
                $(".user-nav-mobile").css("background-image", "url('data:image/png;base64," + data + "')")
            }
        }) 
    }, [user])
    
    //Перемещение на страницу редактирования страницы пользователя
    return (
        <div className="user-nav-mobile">
            <Notice noticeDisplay={noticeDisplay} setNoticeDisplay={setNoticeDisplay} noticeText={noticeText} noticeRef={noticeRef} />
            <img className="user-avatar-mobile" src={avatarCode} alt="useravatar" />
            <div className="banner-mobile">
                <div className="user-nav-info-mobile">
                    <h2 className="user-name-mobile">{user.name} {user.surname}</h2>
                </div>
                <h2 className="user-age-mobile">Дата рождения: <br />{normalizeBirthDate(`${user.age}`)}</h2>
            </div>
        </div>
    )
}

export default Nav