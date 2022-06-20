import { useEffect, useState } from "react"
import api from '../auth/api/auth'
import Message from "./Message"

const Admin = () => {
    const [messages, setMessages] = useState([])
    const [visits, setVisits] = useState(0)

    useEffect(() => {
        const getVisits = async () => {
            const response = await api.get('/admin/visits')
            setVisits(response.data.visits)
        } 
        const getMessages = async () => {
            const response = await api.get('/admin/messages')
            setMessages(response.data.messages)
        }
        getMessages()
        getVisits()
    }, [])

    return (
        <div className="admin">
            <div className="admin-messages">
                {messages.map(item => <Message item={item} />)}
            </div>
            <div className="admin-visits">
                <h1 className="admin-visits-text">{visits} человек послетило ChatLog.ru за все время 
                существования этой чудесной социальной сети.</h1>
            </div>
        </div>
    )
}

export default Admin