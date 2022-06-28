import React, { useContext, useEffect, useState } from "react"
import "../../../auth/styles/user-item.css"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"
import '../../styles/recipients-list.css'


const LinkRecipientItem = ({item, file}) => {
    useEffect(() => {
        console.log(item)
    }, [])
    const auth = useContext(AuthContext)
    //Предпросмотр пользователя на странице со всеми пользователями
    //Перемещение на страницу пользователя
    const createRoom = async () => {
        const response = await api.get(`/api/checkrooms/${item._id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        if(response.data.room) {
            return response
        } else {
            await api.get(`/api/createroom/${item._id}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            const response = await api.get(`/api/getroomid/${item._id}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            return response
        }
    }
    const sendLink = () => {
        createRoom().then(async data => {
            await api.get(`/api/cloud/publicfile/${file.name}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            const link = `http://chatlog.ru/cloud/file/${file._id}`
            console.log(link)
            localStorage.setItem('file-link', link)
            window.location = `/messages/${data.data.room}`
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
        <div>
            {item._id !== auth.userId ? 
                <div onClick={sendLink} className="recipient-item">
                    <div className="recipient-item-right-side">
                        <div><img className="recipient-item-img" src={avatarCode} alt="user" /></div>
                        <div className="recipient-item-info">
                            <h3 className="recipient-item-name">{item.name} {item.surname}</h3>
                            <p className="recipient-item-age">{item.age}</p>
                        </div>
                    </div>
                </div>
                : <></>
            } 
        </div>
    )
}

export default LinkRecipientItem