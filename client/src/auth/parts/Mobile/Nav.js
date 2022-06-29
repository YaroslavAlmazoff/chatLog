import React from "react";
import "../../styles/user.css"
import "../../styles/user-mobile.css"
import Notice from "./../Notice";
import useDate from "../../../common_hooks/date.hook";

const Nav = ({user, noticeDisplay, setNoticeDisplay, noticeText, noticeRef}) => {
    const {normalizeBirthDate} = useDate()
    //Верхняя часть страницы пользователя - информация, редактирование профиля
    
    //Перемещение на страницу редактирования страницы пользователя
    return (
        <div className="user-nav-mobile" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + `/userbanners/` + user.bannerUrl})`}}>
            <Notice noticeDisplay={noticeDisplay} setNoticeDisplay={setNoticeDisplay} noticeText={noticeText} noticeRef={noticeRef} />
            <img className="user-avatar-mobile" src={process.env.REACT_APP_API_URL + `/useravatars/` + user.avatarUrl} alt="useravatar" />
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