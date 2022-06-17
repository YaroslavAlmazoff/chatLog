import React, { useContext, useEffect, useState } from "react"
import "../../../auth/styles/user-item.css"
import { useNavigate } from "react-router"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"


const RecipientItem = ({item, file}) => {
    useEffect(() => {
        console.log(item)
    }, [])
    const auth = useContext(AuthContext)
    //Предпросмотр пользователя на странице со всеми пользователями
    let navigate = useNavigate()
    //Перемещение на страницу пользователя
    const createRoom = async () => {
        await api.get(`/api/createroom/${item._id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        const response = await api.get(`/api/getroom/${item._id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        return response
    }
    const sendLink = () => {
        createRoom().then(data => {
            const link = `chatlog.ru/cloud/file/${file._id}`
            console.log(link, data.data.room._id)
            localStorage.setItem('file-link', link)
            navigate(`/messages/${data.data.room._id}`)
        })
    }
    const {getAvatar} = useFiles()

    const [avatarCode, setAvatarCode] = useState('')

    useEffect(() => {
        getAvatar(item.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        }) 
    }, [item])
    return (
        <div onClick={sendLink} className="user-item">
            <div className="user-item-right-side">
                <div><img className="user-item-img" src={avatarCode} alt="user" /></div>
                <div className="user-item-info">
                    <h3 className="user-item-name">{item.name} {item.surname}</h3>
                    <p className="user-item-age">{item.age}</p>
                </div>
            </div>
        </div>
        
    )
}

export default RecipientItem