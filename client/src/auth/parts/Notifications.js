import React from 'react'
import '../styles/notifications.css'
import Notification from './Notification'
import useRandom from '../../common_hooks/random.hook'

const Notifications = ({notifications, showNotifications, setNotifications, setNoticeDisplay, setNoticeText, setUserFriends, noticeRef}) => {
    //Блок с уведомлениями
    const {randomKey} = useRandom()
    return (
        <div className='notifications'>
            <p onClick={showNotifications} className='delete-notification'>&times;</p>
            {notifications[0] !== undefined ? notifications.map(el => <Notification key={randomKey()} title={el.title} type={el.type} from={el.from} to={el.to} postType={el.postType} postID={el.postID} notifications={notifications} setNotifications={setNotifications} setNoticeDisplay={setNoticeDisplay} setNoticeText={setNoticeText} setUserFriends={setUserFriends} noticeRef={noticeRef} />)
            : <p style={{color: 'white'}}>У вас нет уведомлений</p>}
        </div>
    )
}

export default Notifications