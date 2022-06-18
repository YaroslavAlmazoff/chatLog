import React, { useContext, useEffect, useState } from "react"
import "../styles/user-item.css"
import { useNavigate } from "react-router"
import api from '../api/auth'
import { AuthContext } from "../../context/AuthContext"
import useFiles from "../../common_hooks/files.hook"


const UserItem = ({name, surname, age, avatarUrl, id}) => {
    const [friendsButtonText, setFriendsButtonText] = useState('Добавить в друзья')
    const [isFriends, setIsFriends] = useState(false)
    const auth = useContext(AuthContext)
    //Предпросмотр пользователя на странице со всеми пользователями
    let navigate = useNavigate()
    //Перемещение на страницу пользователя
    const gotoUser = (id) => {
        navigate(`/user/${id}`)
    }
    const {getAvatar} = useFiles()

    const [avatarCode, setAvatarCode] = useState('')

    useEffect(() => {
        getAvatar(avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        }) 
    }, [avatarUrl])
    const createRoom = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const response = await api.get(`/checkrooms/${id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        console.log(response.data.room)
        if(response.data.room) {
            navigate(`/messages/${response.data.room}`)
            return
        } else {
            await api.get(`/api/createroom/${id}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            const response = await api.get(`/api/getroom/${id}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            navigate(`/messages/${response.data.room._id}`)
        }
    }
    const makeFriends = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        setFriendsButtonText('Вы отправили заявку')
        setIsFriends(true)
        //Получение ID пользователей
        const user1 = auth.userId
        const user2 = id
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
    const noop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log('тяжелый случай', e)
    }
    return (
        <div onClick={() => gotoUser(id)} className="user-item">
            <div className="user-item-right-side">
                <div><img className="user-item-img" src={avatarCode} alt="user" /></div>
                <div className="user-item-info">
                    <h3 className="user-item-name">{name} {surname}</h3>
                    <p className="user-item-age">{age}</p>
                </div>
            </div>
            <div>
                {id !== auth.userId 
                ? <div className="user-item-actions">
                    <button onClick={(e) => createRoom(e)} className="user-item-write-message" style={{marginBottom: '5px'}}>Написать сообщение</button>
                    <button onClick={!isFriends ? (e) => makeFriends(e) : (e) => noop(e)} className="user-item-write-message" style={isFriends ? {color: 'rgb(0, 140, 255)', backgroundColor: 'white', border: '1px solid rgb(0, 140, 255)'} : {color: 'white', backgroundColor: 'rgb(0, 140, 255)'}}>Добавить в друзья</button>
                </div>
                : <></>
                }
            </div>

        </div>
        
    )
}

export default UserItem