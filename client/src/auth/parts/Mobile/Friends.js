import React, { useContext, useEffect, useState } from "react";
import useRandom from "../../../common_hooks/random.hook";
import "../../styles/user.css"
import {useParams} from "react-router"
import api from "../../api/auth"
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import FriendItem from "./FriendItem";

const Friends = ({userFriends, isOwner, setUserFriends, setNoticeDisplay, setNoticeText, noticeRef}) => {
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
        if(localStorage.getItem(user2) === auth.userId) {
            setFriendsButtonDisplay('none')
        }
    }, [params, auth])

    useEffect(() => {
        //Проверка являются ли друзьями пользователь и посетитель его страницы
        const checkFriends = async () => {
            //Получение ID пользователей
            const user2 = params.id
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
            console.log(isFriends, response2.data.message, response2.data)
        }
        checkFriends()
    }, [params])
    

    return (
        <div className="user-friends-mobile">
            <p className="user-friends-title-mobile">Друзья {userFriends.length}</p>
            <div className="user-friends-list-mobile">
                {userFriends.map(el => <FriendItem el={el} 
                    setUserFriends={setUserFriends} 
                    userFriends={userFriends} 
                    setNoticeDisplay={setNoticeDisplay} 
                    setNoticeText={setNoticeText} 
                    noticeRef={noticeRef} 
                />)}
            </div> 
        </div>
    )
}

export default Friends