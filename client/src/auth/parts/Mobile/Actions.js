import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import api from "../../api/auth"
import '../../styles/user-mobile.css'

const Actions = ({isOwner, setNoticeDisplay, setNoticeText, noticeRef, setNotificationsDisplay}) => {
    const [friendsButtonDisplay, setFriendsButtonDisplay] = useState('block')
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const params = useParams()
    const gotoEdit = () => {
        navigate(`/editprofile`)
    }
    const gotoCreatePostPage = () => {
        navigate('/createpost')
    }
    const openNotifications = () => {
        setNotificationsDisplay(true)
    }
    useEffect(() => {
        //Проверка есть ли пользователь в друзьях у его посетителя
        const user2 = params.id
        if(localStorage.getItem(user2) === auth.userId) {
            setFriendsButtonDisplay('none')
        }
    }, [params, auth])
    const createRoom = async () => {
        await api.get(`/api/createroom/${params.id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        const response = await api.get(`/api/getroom/${params.id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        navigate(`/messages/${response.data.room._id}`)
    }
    //Отправка заявки в друзья
    const makeFriends = async () => {
        //Всплывающая подсказка об отправлении заявки в друзья
        setNoticeDisplay('block')
        setNoticeText('Вы отправили заявку в друзья.')
        noticeRef.current.classList.add('notice-animation')
        //Удаление кнопки добавить в друзья
        setFriendsButtonDisplay('none')
        //Получение ID пользователей
        const user1 = auth.userId
        const user2 = params.id
        //Проверка есть ли пользователь в друзьях у его посетителя
        if(localStorage.getItem(user2) === user1) {
            console.log(localStorage.getItem(user2) === user1)
            return false
        }
        //Отправка заявки в друзья
        const response = await api.get(`/api/makefriends/${user2}`, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })
        console.log(response)
        //Создание записи в локальном хранилище браузера о том что пользователь и посетитель его страницы - друзья
        localStorage.setItem(user2, user1)
    }
    return (
        <div className="user-mobile-actions">
            {isOwner ? <div className="user-mobile-actions-self">
                <p className="user-add-foto-mobile" onClick={gotoCreatePostPage}><img src={require('./img/pencil.png')} width="10" alt="create post" style={{marginTop: '5px'}} />&nbsp;&nbsp;Создать новую запись</p>
                <p className="user-add-foto-mobile" onClick={gotoEdit} ><img src={require('./img/update.png')} width="10" alt="create post" />&nbsp;&nbsp;Обновить профиль</p>
                <p className="user-add-foto-mobile" onClick={openNotifications} ><img src={require('./img/notifications.png')} alt="notifications" width="11"/>&nbsp;&nbsp;Уведомления</p>
                </div> : <></>}
        </div>
    )
}

export default Actions