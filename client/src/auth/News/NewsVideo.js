import React, { useContext, useEffect, useState } from "react"
import '../styles/user-post.css'
import useReactions from '../../common_hooks/reactions.hook'
import { useNavigate, useParams } from "react-router"
import Likers from "../parts/Likers"
import api from "../api/auth"
import { AuthContext } from "../../context/AuthContext"
import useWord from "../../common_hooks/divideWord.hook"

const NewsVideo = ({title, date, imageUrl = 'user.png', likes, comments, id}) => {
    const {divideWord} = useWord()
    //Пост пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()
    //Получение функции для увеличивания числа лайков и комментариев поста пользователя
    const reaction = useReactions()
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
        navigate(`/video/${id}`)
    } 
    useEffect(() => {
        showLikers()
    }, [])
    return (
        <div onClick={() => openPost(obj)} className="article">
            <video width="260" height="180" controls style={{borderRadius: '11px'}}>
                <source style={{borderRadius: '11px'}} src={require(`../../static/uservideos/${imageUrl}`)} type='video/ogg; codecs="theora, vorbis"' />
                <source style={{borderRadius: '11px'}} src={require(`../../static/uservideos/${imageUrl}`)} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                <source style={{borderRadius: '11px'}} src={require(`../../static/uservideos/${imageUrl}`)} type='video/webm; codecs="vp8, vorbis"'/>
            </video>
             
            <div className="info">
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

export default NewsVideo