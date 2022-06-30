import React, { useContext, useEffect, useState } from "react";
import "../styles/user.css"
import {useParams} from "react-router"
import api from "../api/auth"
import { AuthContext } from "../../context/AuthContext";
import UserFriendItem from "./UserFriendItem";

const UserLeftSide = ({userFriends, isOwner, setUserFriends, setNoticeDisplay, setNoticeText, noticeRef}) => {
    //Левая часть страницы пользователя - добаление в друзья, написать сообщение, друзья, подписки
    const auth = useContext(AuthContext)
    //Получение параметров get-запроса, рандомного ключа и функции навигации
    const params = useParams()

    //Инициализация состояний дисплея кнопки, и флага друзья ли пользователь и посетитель его страницы
    const [friendsButtonDisplay, setFriendsButtonDisplay] = useState('block')
    const [isFriends, setIsFriends] = useState(false)

    useEffect(() => {
        //Проверка есть ли пользователь в друзьях у его посетителя
        const user2 = params.id
        console.log(user2, auth.userId, localStorage.getItem(user2), auth.userId)
        if(!auth.userId) return
        if(localStorage.getItem(user2) === auth.userId) {
            setFriendsButtonDisplay('none')
        }
    }, [params, auth])

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
    useEffect(() => {
        //Проверка являются ли друзьями пользователь и посетитель его страницы
        const checkFriends = async () => {
            if(!auth.userId) return 
            try {
                //Получение ID пользователей
                const user2 = params.id
                console.log(auth)
                //Проверка друзей в базе данных
                const response2 = await api.get(`/api/checknotifications/${user2}`, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                const response3 = await api.get(`/api/checkfriends/${user2}`, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                //Изменение флага являются ли друзьями пользователь и посетитель его страницы
                setIsFriends(response2.data.message)
                setIsFriends(response3.data.message)
                console.log(isFriends, response2, response3)
            } catch(e) {
                console.log(e)
            }
        }
        checkFriends()
    }, [params, auth])
    const createRoom = async () => {
        await api.get(`/api/createroom/${params.id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        const response = await api.get(`/api/getroom/${params.id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        window.location = `/messages/${response.data.room._id}`
    }

    return (
        <div className="user-right-side">
            {!isOwner ? <div className="user-actions">
                <button onClick={createRoom} className="user-action">Написать сообщение</button>
                {isFriends
                ? <h3 style={{color: 'white'}}>У вас в друзьях</h3>
                : <button onClick={makeFriends} className="user-action" style={{display: friendsButtonDisplay}}>Добавить в друзья</button>
                 
                }

            </div> : <></>}
            <div className="user-lists">
                <div className="user-friends">
                    <p className="user-friends-title">Друзья {userFriends.length}</p>
                    <div className="user-friends-list">
                        {userFriends.map(el => <UserFriendItem el={el} 
                    setUserFriends={setUserFriends} 
                    userFriends={userFriends} 
                    setNoticeDisplay={setNoticeDisplay} 
                    setNoticeText={setNoticeText} 
                    noticeRef={noticeRef} 
                />)}
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default UserLeftSide