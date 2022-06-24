import React, { useContext, useEffect, useState } from "react"
import "../styles/room-item.css"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import useWord from "../../../common_hooks/divideWord.hook"
import useFiles from "../../../common_hooks/files.hook"

const RoomItem = ({user1, user2, lastMessage, id}) => {
    const {getAvatar} = useFiles()
    const [isNotReaded, setIsNotReaded] = useState()
    const {divideWord} = useWord()
    const [user, setUser] = useState({
        avatarUrl: 'user.png',
        name: 'unnamed',
        surname: 'unname'
    })
    const [fullLastMessage, setFullLastMessage] = useState({
        user: ''
    })
    useEffect(() => {
        const getFullLastMessage = async () => {
            const response = await api.get(`/api/getfulllastmessage/${id}`)
            console.log(response)
            setFullLastMessage(response.data.fullLastMessage)
        }
        getFullLastMessage()
    }, [id])
    const [imageCode, setImageCode] = useState('')
    useEffect(() => {
        getAvatar(user.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setImageCode(result)
        })
    }, [user])
    const auth = useContext(AuthContext)
    const gotoRoom = (id) => {
        window.location = `/messages/${id}`
    }
    
    useEffect(() => {
        const checkUsers = async () => {
            const response = await api.get(`/api/user/${user1}`)
            const response2 = await api.get(`/api/user/${user2}`)

            console.log(response, response2)

            if(response.data.user._id === auth.userId) {
                setUser(response2.data.user)
            } else {
                setUser(response.data.user)
            }
        }
        checkUsers()
    }, [auth, user1, user2, lastMessage, id])
    useEffect(() => {
        const isNotReadedFunction = async () => {
            const res = await api.get(`/api/newmessage/${id}`)
            console.log(res.data.isNotReaded)
            setIsNotReaded(res.data.isNotReaded)
        }
        isNotReadedFunction()
    }, [id])
    return (
        <div onClick={() => gotoRoom(id)} className={isNotReaded && auth.userId !== fullLastMessage.user  ? 'room-item-blue' : 'room-item'}>
            <div className="room-item-info-wrapper">
                <img className="room-img" width="60" src={imageCode} alt="user" />
                <div className="room-item-info">
                    <p className="room-title">{user.name} {user.surname}</p>
                    <p className="room-last-message">{divideWord(lastMessage, 40)}</p>
                </div>
            </div>
            
        </div>
    )
}

export default RoomItem