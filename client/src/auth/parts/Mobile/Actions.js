import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import api from "../../api/auth"
import '../../styles/user-mobile.css'

const Actions = ({isOwner, setNoticeDisplay, setNoticeText, noticeRef, notificationsDisplay, setNotificationsDisplay}) => {
    const [friendsButtonDisplay, setFriendsButtonDisplay] = useState('block')
    const [notifications, setNotifications] = useState([{
        checked: false
    }])
    const notificationRef = useRef(null)
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const params = useParams()
    const gotoEdit = () => {
        navigate(`/editprofile`)
    }
    const gotoCreatePostPage = () => {
        navigate('/createpost')
    }
    useEffect(() => {
        const getNotifications = async () => {
            const response = await api.get(`/api/getnotifications/${params.id}`)
            setNotifications(response.data.notifications)
        }
        getNotifications()
    }, [params])
    const openNotifications = async () => {
        const response = await api.get(`/api/checknotification/${auth.userId}`,{ headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        notificationRef.current.remove()
        if(!notificationsDisplay) {
            setNotificationsDisplay(true)
        } else {
            setNotificationsDisplay(false)
        }

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
                <p className="user-add-foto-mobile" onClick={openNotifications} ><img src={require('./img/notifications.png')} alt="notifications" width="11"/>&nbsp;&nbsp;Уведомления
                {notifications.length !== 0 ? <>{!notifications[notifications.length - 1].checked ? <p ref={notificationRef} style={{width: '10px', color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.498)', borderRadius: '11px'}}>Новые</p> : <></>}</> : <></>}
                </p>
                </div>
                : <div className="user-mobile-actions-self">
                    <p className="user-add-foto-mobile" onClick={makeFriends} ><img src={require('./img/friends.png')} width="10" alt="create post" />&nbsp;&nbsp;Добавить в друзья</p>
                    <p className="user-add-foto-mobile" onClick={createRoom} ><img src={require('./img/messages.png')} alt="notifications" width="10"/>&nbsp;&nbsp;Написать сообщение</p>
                  </div>}
        </div>
    )
}

export default Actions