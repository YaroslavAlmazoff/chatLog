import React, { useContext, useEffect, useState } from "react"
import '../../styles/user-post-mobile.css'
import { useNavigate } from "react-router"
import Likers from "../Likers"
import api from "../../api/auth"
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"

const UserVideoMobile = ({title, date, imageUrl = 'user.png', likes, comments, id, deletePost, divideWord, setUserPosts, userPosts, isOwner, deleteVideo, userVideos, setUserVideos}) => {
    //Пост пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()

    const {getVideo} = useFiles()
    const [videoCode, setVideoCode] = useState('')

    useEffect(() => {
        getVideo(imageUrl).then((data) => {
            const result = 'data:video/mp4;base64,' + data
            console.log(result)
            setVideoCode(result)
        })
    }, [imageUrl])
    //Получение функции для увеличивания числа лайков и комментариев поста пользователя
    //Создание объекта с информацией поста
    const obj = {title, date, imageUrl, likes, comments, id}
    //Инициализация состояний иконки лайка, количества лайков и количества комментариев
    const [like, setLike] = useState(require('../../img/like_hollow.jpg'))
    const [likesCount, setLikesCount] = useState(likes)
    const [commCount, setCommCount] = useState(comments)
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('block')
    //Подключение иконки комментария
    const commentIcon = require('../../img/comment.png') 
    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('../../img/like_cover.png'))
            }
        })
    }, [likers])
    const comm = (e, obj) => {
        e.stopPropagation()
        setCommCount(commCount + 1)
        navigate(`/video/${obj.id}/comment`)
    }
    const openPost = (obj) => {
        navigate(`/video/${obj.id}`)
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
        if(like === require('../../img/like_cover.png')) {
            setLikesCount(likesCount - 1)
            setLike(require('../../img/like_hollow.jpg'))
            await api.post(`/api/likevideo`, {sub: true, id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        } else {
            setLikesCount(likesCount + 1)
            setLike(require('../../img/like_cover.png'))
            await api.post(`/api/likevideo`, {id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        }   
        navigate(`/video/${id}`)
    } 
    const updateLikers = () => {
        showLikers()
        setLikersDisplay('block')
    }
    return (
        <div onMouseOver={() => updateLikers()}  onMouseLeave={() => setLikersDisplay('none')} onClick={() => openPost(obj)} className="article-video-mobile">
            <div className="info-mobile-mobile">
            {isOwner ? <p onClick={imageUrl.split('.')[1] !== 'mp4' ? (e) => deletePost(e, obj.id, setUserPosts, userPosts) : (e) => deleteVideo(e, obj.id, setUserVideos, userVideos)} className={imageUrl.split('.')[1] !== 'mp4' ? "delete-user-post-mobile" : "delete-user-video-mobile"}>&times;</p> : <></>}
                <div className="head-mobile">
                    <h2 className="title-mobile">{divideWord(title, 20)}</h2>
                    <p className="date-mobile">{date}</p>
                </div>
                <video width="346" controls style={{borderRadius: '11px'}} src={videoCode}>
            </video>
                <div className="l_and_c-mobile">
                    <p><img onClick={(e) => mark(e)} width="30" src={like} alt="like"/>{likesCount}</p>
                    <p><img onClick={(e) => comm(e, obj)} width="26" src={commentIcon} alt="comment"/>{commCount}</p>
                </div>
                <Likers likers={likers} likersDisplay={likersDisplay} />
            </div>
        </div>
    )
}

export default UserVideoMobile