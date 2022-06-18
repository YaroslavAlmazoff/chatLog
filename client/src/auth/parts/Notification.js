import React, { useContext } from 'react'
import '../styles/notifications.css'
import api from '../api/auth'
import Visit from './Notifications/Visit'
import { useParams, useNavigate } from 'react-router'
import Friends from './Notifications/Friends'
import Simple from './Notifications/SimpleFriends'
import SimplePosts from './Notifications/SimplePosts'
import PostVisit from './Notifications/PostVisit'
import { AuthContext } from '../../context/AuthContext'
import GettingFile from './Notifications/GettingFile'

const Notification = ({id, title, type, from, to, postType, postID, notifications, setNotifications, setUserFriends, setNoticeText, setNoticeDisplay, noticeRef}) => {
    //Уведомление
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    //Получаем параметры из get-запроса
    const params = useParams()
    //Ответ на заявку в друзья
    const reply = async (itog) => {
        //Показ подсказки
        setNoticeDisplay('block')
        setNoticeText('Теперь вы друзья.')
        //Изменение списка уведомлений
        setNotifications([...notifications].filter(el => el.title !== title))
        //Удаление уведомления
        const answer = await api.delete(`/api/deletenotification/${title}`, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })
        console.log(answer)
        if(!itog) {
            //Если заявка была отклонена
            setNoticeDisplay('block')
            setNoticeText('Вы отклонили заявку в друзья.')
            noticeRef.current.classList.add('notice-animation')
            return
        }
        //Добавление в друзья
        const response = await api.get(`/api/reply/${from}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        console.log(response)
        //Получение нового списка друзей пользователя
        const userdata = await api.get(`/api/user/${params.id}`)
        const friendsID = userdata.data.user.friends
        let friends = []
        for(let i = 0; i < friendsID.length; i++) {
            const data = await api.get(`/api/user/${friendsID[i]}`)
            friends.push(data.data.user)
        }
        //Изменение списка друзей пользователя
        setUserFriends(friends)
    }
    const gettingFile = async () => {
        await api.get(`/api/getsentfile/${id}`)
        navigate('/cloud')
    }
    return (
        <div className='notification'>
            {type === 'friends'
            ? <Friends title={title} from={from} reply={reply} />
            : <></>}
            {type === 'reply' || type === 'delete' || type === 'reject'
            ? <Simple title={title} from={from}/>
            : <></>}
            {type === 'like' || type === 'comment' || type === 'postvisit'
            ? <SimplePosts title={title} postType={postType} postID={postID} />
            : <></>}
            {type === 'visit'
            ? <Visit title={title} from={from}/>
            : <></>}
            {type === 'visitpost'
            ? <PostVisit title={title} postType={postType} postID={postID}/>
            : <></>}
            {type === 'file'
            ? <GettingFile title={title} gettingFile={gettingFile} id={id} />
            : <></>}
        </div>
    )
}

export default Notification