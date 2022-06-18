import React, { useContext, useEffect, useState } from "react"
import "../../../auth/styles/user-item.css"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"
import '../../styles/recipients-list.css'


const RecipientItem = ({item, file}) => {
    const [fileStatusText, setFileStatusText] = useState('')
    useEffect(() => {
        console.log(item)
    }, [])
    const auth = useContext(AuthContext)
    //Предпросмотр пользователя на странице со всеми пользователями
    //Перемещение на страницу пользователя
    const sendFile = async () => {
        await api.get(`/api/sendfile/${item._id}/${file.name}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        setFileStatusText('Файл отправлен.')
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
                <div onClick={sendFile} className="user-item recipient-item">
                    <div className="user-item-right-side">
                        <div><img className="user-item-img" src={avatarCode} alt="user" /></div>
                        <div className="user-item-info">
                            <h3 className="user-item-name">{item.name} {item.surname}</h3>
                            <p className="user-item-age">{item.age}</p>
                        </div>
                    </div>
                    <div>
                        <p>{fileStatusText}</p>
                    </div>
                </div>
                : <></>
            } 
        </div>
    )
}

export default RecipientItem