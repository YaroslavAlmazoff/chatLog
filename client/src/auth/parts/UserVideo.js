import React, { useContext, useEffect, useState } from "react"
import '../styles/user-post.css'
import Likers from "./Likers"
import api from "../api/auth"
import { AuthContext } from "../../context/AuthContext"

const UserVideo = ({title, date, imageUrl = 'user.png', likes, comments, id, deletePost, divideWord, setUserPosts, userPosts, isOwner, deleteVideo, userVideos, setUserVideos}) => {
    //Пост пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации

    //Получение функции для увеличивания числа лайков и комментариев поста пользователя
    //Создание объекта с информацией поста
    const obj = {title, date, imageUrl, likes, comments, id}
    //Инициализация состояний иконки лайка, количества лайков и количества комментариев
    const [like, setLike] = useState(require('../img/like_hollow.jpg'))
    const [likesCount, setLikesCount] = useState(likes)
    const [commCount, setCommCount] = useState(comments)
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('block')
    //Подключение иконки комментария
    const commentIcon = require('../img/comment.png') 
    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('../img/like_cover.png'))
            }
        })
    }, [likers])
    const comm = (e, obj) => {
        e.stopPropagation()
        setCommCount(commCount + 1)
        window.location = `/video/${obj.id}/comment`
    }
    const openPost = (obj) => {
        window.location = `/video/${obj.id}`
    }
    const showLikers = async () => {
        console.log(id)
        const response = await api.get(`/api/video/${id}`)
        let likersID = []
        likersID = response.data.video.likers
        let likersArr = []
        for(let i = 0; i < likersID.length; i++) {
            const data = await api.get(`/api/user/${likersID[i]}`)
            likersArr.push(data.data.user)
        }
        //Помещение друзей пользователя в состояние
        setLikers([...likersArr].reverse())
    }
    const mark = async (e) => {
        e.stopPropagation()
        likers.forEach(el => {
            if(el._id === auth.userId) {
                return
            }
        })
        if(like === require('../img/like_cover.png')) {
            setLikesCount(likesCount - 1)
            setLike(require('../img/like_hollow.jpg'))
            await api.post(`/api/likevideo`, {sub: true, id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        } else {
            setLikesCount(likesCount + 1)
            setLike(require('../img/like_cover.png'))
            await api.post(`/api/likevideo`, {id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        }   
        window.location = `/video/${id}`
    } 
    const updateLikers = () => {
        showLikers()
        setLikersDisplay('block')
    }
    return (
        <div onMouseOver={() => updateLikers()}  onMouseLeave={() => setLikersDisplay('none')} onClick={() => openPost(obj)} className="article">
            <video width="260" height="180" controls style={{borderRadius: '11px'}} src={process.env.REACT_APP_API_URL + imageUrl}>
            </video>
             
            <div className="info">
            {isOwner ? <p onClick={imageUrl.split('.')[1] !== 'mp4' ? (e) => deletePost(e, obj.id, setUserPosts, userPosts) : (e) => deleteVideo(e, obj.id, setUserVideos, userVideos)} className={imageUrl.split('.')[1] !== 'mp4' ? "delete-user-post" : "delete-user-video"}>&times;</p> : <></>}
                <div className="head">
                    <h2 className="title">{divideWord(title, 20)}</h2>
                    <p className="date">{date}</p>
                </div>
                <div className="l_and_c">
                    <p><img onClick={(e) => mark(e)} width="30" src={like} alt="like"/>{likesCount}</p>
                    <p><img onClick={(e) => comm(e, obj)} width="26" src={commentIcon} alt="comment"/>{commCount}</p>
                </div>
                <Likers likers={likers} likersDisplay={likersDisplay} />
            </div>
        </div>
    )
}

export default UserVideo