import { useContext, useEffect, useState } from "react"
import api from "./api/auth"
import NotificationItem from "./parts/NotificationItem"
import { AuthContext } from "../context/AuthContext"

const NotificationsPage = () => {
    const auth = useContext(AuthContext)
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        const getNotifications = async () => {
            const response = await api.get(`/api/getnotifications`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            //Помещение уведомлений в состояние
            setNotifications([...response.data.notifications].reverse())
        } 
        getNotifications()
    })
    return (
        <div>
            {notifications.map(el => <NotificationItem />)}
        </div>
    )
} 
export default NotificationsPage