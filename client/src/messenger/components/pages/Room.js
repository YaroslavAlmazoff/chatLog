import React, { useContext, useEffect, useState, useRef } from "react"
import "../styles/room.css"
import api from '../../../auth/api/auth'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext"
import useDate from "../../../common_hooks/date.hook"
import useRandom from "../../../common_hooks/random.hook"
import ImagePreview1 from "../../../auth/parts/ImagePreview1"
import VideoPreview from "../../../auth/parts/VideoPreview"
import useFiles from "../../../common_hooks/files.hook"
import Message from "../parts/Message"

export const Room = () => {
    const {getAvatar} = useFiles()
    const {randomKey} = useRandom()
    const {getCurrentDate} = useDate()
    const auth = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [penFriend, setPenFriend] = useState('')
    const [fullPenFriend, setFullPenFriend] = useState({})
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
    useEffect(() => {
        if(localStorage.getItem('file-link')) {
            console.log(localStorage.getItem('file-link'))
            setMessage(`Файл ${localStorage.getItem('file-link')}`)
        }
        
    }, [])
    const subscribe = async () => {
        
        roomRef.current.scrollTop = roomRef.current.scrollHeight;
        try {
            const response = await api.get(`/api/getmessages/${params.id}`)
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
        const dialog = async () => {
            const response = await api.get(`/api/roombyid/${params.id}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            console.log(response)
            const user1 = response.data.room.user1
            const user2 = response.data.room.user2
            
            let user = ''
            if(user1 === auth.userId) {
                user = user2
            } else {
                user = user1
            }
            const userResponse = await api.get(`/api/user/${user}`)
            setFullPenFriend(response.data.user)
            const name = userResponse.data.user.name
            const surname = userResponse.data.user.surname
            const fullName = name + ' ' + surname
            console.log(fullName)
            setPenFriend(fullName)
        }
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
        dialog()
        
        
        
    }, [params, auth])

    useEffect(() => {
        const readMessage = async () => {
            const res = await api.get(`/api/read/${params.id}`)
            console.log(res)
        }
        if(!messages.length) {
            return
        }
        console.log(messages, auth.userId !== messages[messages.length - 1].user)
        if(auth.userId !== messages[messages.length - 1].user) {
            readMessage()
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
        await api.post(`/api/lastmessage/${params.id}`, {lastMessage: message})

        await api.post(`/api/sendmessage/${params.id}`,
            formData, {headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,   
        }})
    
    }
    return (
            <div className="room-wrapper">
            <div ref={roomRef} className="room-window">
                <div className="room-head">{penFriend}</div>
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