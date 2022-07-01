import React, { useContext, useEffect, useState, useRef } from "react"
import '../styles/user-post.css'
import Likers from "./Likers"
import api from "../api/auth"
import { AuthContext } from "../../context/AuthContext"
import Loader from "../../common_components/Loader"

const UserPost = ({title, date, imageUrl = 'user.png', likes, comments, id, deletePost, divideWord, setUserPosts, userPosts, isOwner, deleteVideo, userVideos, setUserVideos}) => {
    //Пост пользователя
    let articleRef = useRef(null)
    const auth = useContext(AuthContext)
    //Получение функции для увеличивания числа лайков и комментариев поста пользователя
    const [loading, setLoading] = useState(false)

    //Создание объекта с информацией поста
    const obj = {title, date, imageUrl, likes, comments, id}
    //Инициализация состояний иконки лайка, количества лайков и количества комментариев
    const [like, setLike] = useState(require('../img/like_hollow.jpg'))
    const [likesCount, setLikesCount] = useState(likes)
    const [commCount, setCommCount] = useState(comments)
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('none')
    //Подключение иконки комментария
    const commentIcon = require('../img/comment.png') 

    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('../img/like_cover.png'))
            }
        })
    }, [likers, auth])
    const comm = (e, obj) => {
        e.stopPropagation()
        setCommCount(commCount + 1)
        window.location = `/article/${obj.id}/comment`
    }
    const openPost = (obj) => {
        window.location = `/article/${obj.id}`
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
        if(like === require('../img/like_cover.png')) {
            setLikesCount(likesCount - 1)
            setLike(require('../img/like_hollow.jpg'))
            await api.post(`/api/like`, {sub: true, id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            
        } else {
            setLikesCount(likesCount + 1)
            setLike(require('../img/like_cover.png'))
            await api.post(`/api/like`, {id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            
        }   
    } 
    useEffect(() => {
        showLikers()
        console.log(process.env.REACT_APP_API_URL)
    }, [id])
    const updateLikers = () => {
        showLikers()
        setLikersDisplay('block')
    }
    return (
        <div ref={articleRef} onMouseOver={() => updateLikers()}  onMouseLeave={() => setLikersDisplay('none')} onClick={() => openPost(obj)} className={imageUrl !== 'none.png' ? "article" : "article-without-image"}> 
            {imageUrl !== 'none.png' ? <div className="portrait-crop">
                {!loading ? <img className="article-image" src={process.env.REACT_APP_API_URL + '/articles/' + imageUrl} alt="article"/> : <Loader ml={'50%'} />}
            </div> : <h2 className="title">{divideWord(title, 200)}</h2> }
             
            <div className={imageUrl !== 'none.png' ? "info": "info-without-image"}>
            {isOwner ? <p onClick={imageUrl.split('.')[1] !== 'mp4' ? (e) => deletePost(e, obj.id, setUserPosts, userPosts) : (e) => deleteVideo(e, obj.id, setUserVideos, userVideos)} className={imageUrl.split('.')[1] !== 'mp4' ? "delete-user-post" : "delete-user-video"}>&times;</p> : <></>}
                <div className="head">
                    <p></p>
                    <p className="date">{date}</p>
                </div>
                <div className={imageUrl !== 'none.png' ? "l_and_c": "l_and_c-without-image"}>
                    <p><img onClick={(e) => mark(e)} width="30" src={like} alt="like"/>{likesCount}</p>
                    <p><img onClick={(e) => comm(e, obj)} width="26" src={commentIcon} alt="comment"/>{commCount}</p>
                </div>
                <Likers likers={likers} likersDisplay={likersDisplay} />
            </div>
        </div>
    )
}

export default UserPost