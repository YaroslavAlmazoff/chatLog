import React, { useContext, useEffect, useState, useRef } from "react"
import "../styles/room.css"
import api from '../../../auth/api/auth'
import {useParams} from 'react-router-dom'
import { AuthContext } from "../../../context/AuthContext"
import useDate from "../../../common_hooks/date.hook"
import ImagePreview1 from "../../../auth/parts/ImagePreview1"
import VideoPreview from "../../../auth/parts/VideoPreview"
import Message from "../parts/Message"
import {smiles} from './smiles'
import Smile from "../parts/Smile"
import '../styles/smiles.css'

export const Room = () => {
    const messageRef = useRef(null)
    const {getCurrentDate} = useDate()
    const auth = useContext(AuthContext)
    const [messages, setMessages] = useState([])
    const [penFriend, setPenFriend] = useState('')
    const [fullPenFriend, setFullPenFriend] = useState({})
    const [smilesDisplay, setSmilesDisplay] = useState('none')
    const params = useParams()
    const roomRef = useRef()
    const fileRef = useRef()
    const fileRefVideo = useRef()

    const [imagePreviewDisplay1, setImagePreviewDisplay1] = useState('none')
    const [imagePreviewUrl1, setImagePreviewUrl1] = useState('')
    const [videoPreviewUrl, setVideoPreviewUrl] = useState('')
    const [videoPreviewDisplay, setVideoPreviewDisplay] = useState('none')
    const [file, setFile] = useState('')
    const [videoFile, setVideoFile] = useState('')

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
    //Эмитирование открытия загрузки файла изображения для поста
    const emitOpenVideo = () => {
        fileRefVideo.current.click()
    }
    //Получение файла изображения поста пользователя
    const getFileVideo = async (e) => {
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
        setVideoFile(file)
    }
    useEffect(() => {
        if(localStorage.getItem('file-link')) {
            console.log(localStorage.getItem('file-link'))
            messageRef.current.value = localStorage.getItem('file-link')
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
        console.log('aaaaaaaaaaaaaaaaa')
        setVideoFile('')
        setFile('')
        const res = await api.get(`/api/read/${params.id}`)
        console.log(res)
        const date = getCurrentDate()
        let formData = new FormData()
        console.log(file)
        formData.append('message', messageRef.current.value)
        formData.append('date', date)
        formData.append('file', file)
        formData.append('videofile', videoFile)
        formData.append('isFile', !!localStorage.getItem('file-link'))
        
        await api.post(`/api/lastmessage/${params.id}`, {lastMessage: messageRef.current.value})

        await api.post(`/api/sendmessage/${params.id}`,
            formData, {headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`,   
        }})
        console.log('end')
    
    }
    const showSmiles = () => {
        if(smilesDisplay === 'none') {
            setSmilesDisplay('block')
        } else {
            setSmilesDisplay('none')
        }
        console.log('sesh')
    }
    return (
            <div className="room-wrapper">
            <div ref={roomRef} className="room-window">
                <div className="room-head">{penFriend}</div>
                <div className="room-smiles" style={{display: smilesDisplay}}>
                    {smiles.map(el => <Smile el={el} />)}
                </div>
                <div className="messages">
                
                {messages.map(mess => <Message mess={mess} />)}
                </div>
            </div>
            <div className="message-actions">
                <input ref={messageRef} type="text" className="message-input" placeholder="Напишите сообщение..." />
                <img onClick={showSmiles} className="upload-message-image" src={require(`../../img/smile.png`)} alt='img'/>
                <img onClick={(e) => emitOpen(e)} className="upload-message-image" src={require(`../../img/upload-image.png`)} alt='img'/>
                <img onClick={(e) => emitOpenVideo(e)} className="upload-message-image" src={require(`../../img/upload-video.png`)} alt='img'/>
                <button onClick={sendMessage} className="send-message">Отправить</button>
                <input onChange={(e) => getFile(e)} ref={fileRef} type="file" />
                <input onChange={(e) => getFileVideo(e)} ref={fileRefVideo} type="file" />
            </div>
            {file.type === 'image/jpeg' || file.type === 'image/png'
                ? <ImagePreview1 imagePreviewUrl1={imagePreviewUrl1} imagePreviewDisplay1={imagePreviewDisplay1} />
                : <VideoPreview videoPreviewDisplay={videoPreviewDisplay} videoPreviewUrl={videoPreviewUrl} />
            }
        </div>
        
        
    )
}