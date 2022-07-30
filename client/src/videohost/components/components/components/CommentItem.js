import React, { useEffect, useState } from 'react'
import api from '../../../../auth/api/auth'

const CommentItem = ({item}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const getUser = async () => {
            const response = await api.get(`/api/user/${item.user}`)
            setUser(response.data.user)
        }
        getUser()
    }, [item])


  return (
    <div className="videohost-video-comment">
        <img className="videohost-video-comment-avatar" src={process.env.REACT_APP_API_URL + '/useravatars/' + user.avatarUrl} alt="" />
        <div className="videohost-video-comment-user">
            <strong className="videhost-video-comment-name">{user.name} {user.surname}</strong>
            <p className="videohost-video-comment-date">{item.date}</p>
        </div>
        <p className="videohost-video-comment-text">{item.text}</p>
    </div>
  )
}

export default CommentItem
