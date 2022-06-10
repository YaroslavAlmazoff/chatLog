import { useState } from "react"

const Notifications = () => {
    const [notifications, setNotifications] = useState([])
    return(
        <div>
            {notifications.map(el => <div></div>)}
        </div>
    )
}

export default Notifications