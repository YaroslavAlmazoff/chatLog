import { useEffect, useState, useContext } from "react"
import api from '../auth/api/auth'
import Message from "./Message"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router"

const Admin = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const [messages, setMessages] = useState([])
    const [visits, setVisits] = useState(0)

    useEffect(() => {
        console.log(auth.userId === null || auth.userId !== '628e5aab0153706a3e18fe79')
        if(auth.userId === null || auth.userId !== '628e5aab0153706a3e18fe79') {
            navigate('/')
        }
    }, [auth])
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
                существования этой чедесной социальной сети.</h1>
            </div>
        </div>
    )
}

export default Admin