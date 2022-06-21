import React, { useContext, useEffect, useState, useRef } from "react"
import "../styles/room.css"
import api from '../../../auth/api/auth'
import {useParams} from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext"
import useDate from "../../../common_hooks/date.hook"
import ImagePreview1 from "../../../auth/parts/ImagePreview1"
import VideoPreview from "../../../auth/parts/VideoPreview"
import Message from "../parts/Message"

export const ChatRoom = () => {
    const {getCurrentDate} = useDate()
    const auth = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const params = useParams()
    const roomRef = useRef()
    const fileRef = useRef()

    const [imagePreviewDisplay1, setImagePreviewDisplay1] = useState('none')
    const [imagePreviewUrl1, setImagePreviewUrl1] = useState('')
    const [videoPreviewUrl, setVideoPreviewUrl] = useState('')
    const [videoPreviewDisplay, setVideoPreviewDisplay] = useState('none')
    const [file, setFile] = useState('')

    //Эмитирование открытия загрузки файла изображения для поста
    const emitOpen = () => {
        fileRef.current.click()
    }
    //Получение файла изображения поста пользователя
    const getFile = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {    
            if(file.type === 'image/jpeg' || file.type === 'image/png') {
                setImagePreviewDisplay1('block')  
                setImagePreviewUrl1(ev.target.result)
            } else {
                setVideoPreviewDisplay('block')  
                setVideoPreviewUrl(ev.target.result)
            }
            
        }
        reader.readAsDataURL(file)
        //Загрузка файла в состояние
        setFile(file)
    }
    const subscribe = async () => {
        
        roomRef.current.scrollTop = roomRef.current.scrollHeight;
        try {
            const response = await api.get(`/api/chat/getmessages/${params.id}`)
            console.log(response)
            
            setMessages(response.data.messages)
            
            await subscribe()
        } catch(e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }
    
    useEffect(() => {
        const subscribeStart = async () => {
            try {
                const response = await api.get(`/api/getmessagesstart/${params.id}`)
                console.log(response)
                setMessages(response.data.messages)
                const newMessages = response.data.messages
                const lastMessageUser = newMessages[newMessages.length - 1].user
                console.log(response.data.messages, newMessages, lastMessageUser)
                await subscribe()
            } catch(e) {
                setTimeout(() => {
                    subscribe()
                }, 500)
            }
        }
        subscribeStart() 
    }, [params, auth])

    useEffect(() => {
        if(!messages.length) {
            return
        }
    }, [params, auth, messages])
    
    
    const sendMessage = async () => {
        const date = getCurrentDate()
        let formData = new FormData()
        console.log(file)
        formData.append('message', message)
        formData.append('date', date)
        formData.append('file', file)
        formData.append('isFile', !!localStorage.getItem('file-link'))
        if(localStorage.getItem('file-link')) {
            localStorage.removeItem('file-link')
        }
        await api.post(`/api/chat/lastmessage/${params.id}`, {lastMessage: message})

        await api.post(`/api/chat/sendmessage/${params.id}`,
            formData, {headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,   
        }})
    
    }
    return (
            <div className="room-wrapper">
            <div ref={roomRef} className="room-window">
                <div className="room-head">Анонимный чат</div>
                <div className="messages">
                {messages.map(mess => <Message mess={mess} />)}
                </div>
            </div>
            <div className="message-actions">
                <input type="text" className="message-input" placeholder="Напишите сообщение..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <img onClick={(e) => emitOpen(e)} className="upload-message-image" src={require(`../../img/upload-image.png`)} alt='img'/>
                <button onClick={() => {sendMessage(); setMessage('')}} className="send-message">Отправить</button>
                <input onChange={(e) => getFile(e)} ref={fileRef} type="file" />
            </div>
            {file.type === 'image/jpeg' || file.type === 'image/png'
                ? <ImagePreview1 imagePreviewUrl1={imagePreviewUrl1} imagePreviewDisplay1={imagePreviewDisplay1} />
                : <VideoPreview videoPreviewDisplay={videoPreviewDisplay} videoPreviewUrl={videoPreviewUrl} />
            }
        </div>
        
        
    )
}