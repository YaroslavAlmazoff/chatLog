import React, { useContext, useEffect, useState } from "react"
import "../styles/user-item.css"
import { useNavigate } from "react-router"
import api from '../api/auth'
import { AuthContext } from "../../context/AuthContext"
import useFiles from "../../common_hooks/files.hook"


const UserItem = ({name, surname, age, avatarUrl, id}) => {
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
        await api.get(`/api/createroom/${id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        const response = await api.get(`/api/getroom/${id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        navigate(`/messages/${response.data.room._id}`)
    }
    return (
        <div onClick={() => gotoUser(id)} className="user-item">
            <div className="user-item-right-side">
                <div><img className="user-item-img" src={avatarCode} alt="user" /></div>
                <div className="user-item-info">
                    <h3 className="user-item-name">{name} {surname}</h3>
                    <p className="user-item-age">{age + ' лет'}</p>
                </div>
            </div>
            <div className="user-item-actions">
                <button onClick={(e) => createRoom(e)} className="user-item-write-message">Написать сообщение</button>
            </div>

        </div>
        
    )
}

export default UserItem