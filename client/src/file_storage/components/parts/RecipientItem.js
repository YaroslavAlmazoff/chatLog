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
    return (
        <div>
            {item._id !== auth.userId ? 
                <div onClick={sendFile} className="recipient-item">
                    <div className="recipient-item-right-side">
                        <div><img className="recipient-item-img" src={process.env.REACT_APP_API_URL + `/userfiles/` + item.avatarUrl} alt="user" /></div>
                        <div className="recipient-item-info">
                            <h3 className="recipient-item-name">{item.name} {item.surname}</h3>
                            <p className="recipient-item-age">{item.age}</p>
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