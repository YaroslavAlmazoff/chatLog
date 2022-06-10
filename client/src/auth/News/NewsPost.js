import React, { useContext, useEffect, useState } from "react"
import '../styles/user-post.css'
import { useNavigate } from "react-router"
import Likers from "../parts/Likers"
import api from "../api/auth"
import { AuthContext } from "../../context/AuthContext"
import useWord from '../../common_hooks/divideWord.hook'

const NewsPost = ({title, date, imageUrl = 'user.png', likes, comments, id}) => {
    const {divideWord} = useWord()
    //Пост пользователя
    const auth = useContext(AuthContext)
    //Получение функции навигации
    let navigate = useNavigate()
    //Получение функции для увеличивания числа лайков и комментариев поста пользователя

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
    }, [id])
    const updateLikers = () => {
        showLikers()
        setLikersDisplay('block')
    }
    return (
        <div  onMouseOver={() => updateLikers()}  onMouseLeave={() => setLikersDisplay('none')} onClick={() => openPost(obj)} className="article"> 
            <div className="portrait-crop">
                <img className="article-image" src={require(`../../static/articles/${imageUrl}`)} alt="article"/>
            </div> 
             
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

export default NewsPost