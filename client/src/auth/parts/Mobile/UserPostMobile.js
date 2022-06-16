import React, { useContext, useEffect, useState } from "react"
import '../../styles/user-post-mobile.css'
import useFiles from "../../../common_hooks/files.hook"
import { useNavigate } from "react-router"
import Likers from "../Likers"
import api from "../../api/auth"
import { AuthContext } from "../../../context/AuthContext"

const UserPostMobile = ({title, date, imageUrl = 'user.png', likes, comments, id, deletePost, divideWord, setUserPosts, userPosts, isOwner, deleteVideo, userVideos, setUserVideos}) => {
    //Пост пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()
    //Получение функции для увеличивания числа лайков и комментариев поста пользователя
    const {getPost} = useFiles()
    const [imageCode, setImageCode] = useState('')

    useEffect(() => {
        if(imageUrl !== 'none.png' && imageUrl !== 'user.png') {
            getPost(imageUrl).then((data) => {
                const result = 'data:image/jpeg;base64,' + data
                setImageCode(result)
            })
        }
    }, [])
    //Создание объекта с информацией поста
    const obj = {title, date, imageUrl, likes, comments, id}
    //Инициализация состояний иконки лайка, количества лайков и количества комментариев
    const [like, setLike] = useState(require('../../img/like_hollow.jpg'))
    const [likesCount, setLikesCount] = useState(likes)
    const [commCount, setCommCount] = useState(comments)
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('none')
    //Подключение иконки комментария
    const commentIcon = require('../../img/comment.png') 

    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('../../img/like_cover.png'))
            }
        })
    }, [likers, auth])
    const comm = (e, obj) => {
        e.stopPropagation()
        setCommCount(commCount + 1)
        navigate(`/article/${obj.id}/comment`)
    }
    const openPost = (obj) => {
        navigate(`/article/${obj.id}`)
    }
    const showLikers = async () => {
        console.log(id)
        const response = await api.get(`/api/post/${id}`)
        let likersID = []
        likersID = response.data.article.likers
        let likersArr = []
        for(let i = 0; i < likersID.length; i++) {
            const data = await api.get(`/api/user/${likersID[i]}`)
            likersArr.push(data.data.user)
        }
        //Помещение друзей пользователя в состояние
        setLikers([...likersArr].reverse())
        console.log(likers)
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
            await api.post(`/api/like`, {sub: true, id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            
        } else {
            setLikesCount(likesCount + 1)
            setLike(require('../../img/like_cover.png'))
            await api.post(`/api/like`, {id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            
        }   
    } 
    useEffect(() => {
        showLikers()
    }, [id])
    const updateLikers = () => {
        showLikers()
        setLikersDisplay('block')
    }
    return (
        <div onMouseOver={() => updateLikers()}  onMouseLeave={() => setLikersDisplay('none')} onClick={() => openPost(obj)} className={imageUrl !== 'none.png' ? "article-mobile" : "article-without-image-mobile"}> 
            <div className="info-mobile">
            {isOwner ? <p onClick={imageUrl.split('.')[1] !== 'mp4' ? (e) => deletePost(e, obj.id, setUserPosts, userPosts) : (e) => deleteVideo(e, obj.id, setUserVideos, userVideos)} className={imageUrl.split('.')[1] !== 'mp4' ? "delete-user-post-mobile" : "delete-user-video-mobile"}>&times;</p> : <></>}
                <div className="head-mobile">
                    <p></p>
                    <p className="date-mobile">{date}</p>
                </div>
            </div>
            {imageUrl !== 'none.png' ? <img className="article-image-mobile" src={imageCode} alt="article"/>:<h2 className="title-mobile">{divideWord(title, 20)}</h2>}
            <div className="l_and_c-mobile">
                    <p><img onClick={(e) => mark(e)} width="30" src={like} alt="like"/>{likesCount}</p>
                    <p><img onClick={(e) => comm(e, obj)} width="26" src={commentIcon} alt="comment"/>{commCount}</p>
             </div>
             <Likers likers={likers} likersDisplay={likersDisplay} />
        </div>
    )
}

export default UserPostMobile