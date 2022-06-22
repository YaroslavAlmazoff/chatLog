import React, { useEffect, useState } from "react";
import ImagePreview2 from "./ImagePreview2";
import useRandom from "../../common_hooks/random.hook";
import "../styles/user.css"
import { useNavigate, useParams } from "react-router";
import FotoItem from "./FotoItem";
import useDate from "../../common_hooks/date.hook";
import api from '../api/auth'

const UserRightSide = ({getFile2, fileRef2, emitOpen2, 
    imagePreviewUrl2, imagePreviewDisplay2, sendFoto, 
    userFotos, file2, setUserFotos, 
    isOwner, showNotifications, notificationRef}) => {
    const [notifications, setNotifications] = useState([{
        checked: false
    }])
    const params = useParams()
    const {getCurrentDate} = useDate()
    //Правая часть страницы пользователя - добавление фотографий и список фотографий
    const {randomKey} = useRandom()
    const navigate = useNavigate()
    const showFotography = (img) => {
        navigate(`/fotography/${img}`)
    }
    useEffect(() => {
        console.log('че за фигня')
        const getNotifications = async () => {
            console.log('aaaaaaa')
            const response = await api.get(`/api/getnotifications/${params.id}`)
            console.log(response)
            setNotifications(response.data.notifications)
        }
        getNotifications()
        console.log('так не честно')
    }, [params])
    return (

        <div className="user-left-side">
                    {isOwner ? <div>
                        <div ref={notificationRef}>
                            {notifications.length !== 0 ? <div>{!notifications[notifications.length - 1].checked ? <div style={{width: '10px', height: '30px', backgroundColor: 'red', borderRadius: '50%'}}></div> : <></>}</div> : <></>}
                            <img className="notice-img" onClick={showNotifications} width="35" src={require('../img/notice.png')} alt="notice" />
                        </div>
                        <input onChange={(e) => getFile2(e)} ref={fileRef2} type="file" />
                        <button onClick={(e) => emitOpen2(e)} className="user-add-foto-right">Добавить фотографию</button>
                        <button onClick={() => sendFoto(file2, getCurrentDate, params, userFotos, setUserFotos)} className="user-add-foto-right">Отправить фотографию</button>
                        <ImagePreview2 imagePreviewUrl2={imagePreviewUrl2} imagePreviewDisplay2={imagePreviewDisplay2} />
                    </div> : <></>}
                    <div className="user-fotos">
                    <p className="user-fotos-title">Фотографии {userFotos.length}</p>
                    {userFotos.map(el => <div className="foto-div" onClick={() => showFotography(el.imageUrl)} key={randomKey()}><FotoItem imageUrl={el.imageUrl} /></div>)}
                    </div>
                    
        </div>
    )
}

export default UserRightSide