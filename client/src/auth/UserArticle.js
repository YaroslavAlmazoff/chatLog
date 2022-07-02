import React, {useState, useEffect, useContext} from "react"
import { useParams } from "react-router"
import useReactions from "../common_hooks/reactions.hook"
import useDate from "../common_hooks/date.hook"
import api from "./api/auth"
import "./styles/article.css"
import "./styles/fotography.css"
import UserArticleComment from "./parts/UserArticleComment"
import Likers from "./parts/Likers"
import Loader from "../common_components/Loader"
import {AuthContext} from '../context/AuthContext'
import Smile from "../messenger/components/parts/Smile"
import { smiles } from "../messenger/components/pages/smiles"

const UserArticle = () => {
    const [imageUrl, setImageUrl] = useState('user.png')

    //Страница поста пользователя
    const auth = useContext(AuthContext)
    //Получение параметров
    const params = useParams()
    //Подключение иконки комментария
    const commentIcon = require('./img/comment_white.png') 
    //Получение функции для увеличивания количества лайков и комментариев и получения даты из кастомных хуков
    const reaction = useReactions()
    const {getCurrentDate} = useDate()
    //Инициализация состояний для названия поста, его текста, даты, url изображения, поля комментирования, комментария, и всех комментариев
    const [articleTitle, setArticleTitle] = useState('')
    const [articleText, setArticleText] = useState('')
    const [articleDate, setArticleDate] = useState('')
    const [commentField, setCommentField] = useState(null)
    const [commentValue, setCommentValue] = useState('Ваш комментарий')
    const [comments, setComments] = useState([])
    const [articleLikes, setArticleLikes] = useState('')
    const [articleComments, setArticleComments] = useState('')
    const [like, setLike] = useState(require('./img/like_hollow_white.png'))
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('block')
    const [smilesDisplay, setSmilesDisplay] = useState('none')
    const comm = (e, obj) => {
        e.stopPropagation()
        setArticleComments(articleComments + 1)
        window.location = `/article/${obj.id}/comment`
    }
    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('./img/like_cover_white.png'))
            }
        })
    }, [likers, auth])
    const obj = {articleTitle, articleDate, imageUrl, articleLikes, articleComments, comments, id: params.id}
    const sendComment = async () => {
        const currentDate = getCurrentDate()
        await api.post(`/api/sendcomment/${params.id}`, {
            comment: commentValue, 
            date: currentDate, 
            articleID: params.id, 
        }, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })
        window.location = `/article/${params.id}`
    }
    const mark = async (e) => {
        e.stopPropagation()
        likers.forEach(el => {
            if(el._id === auth.userId) {
                return
            }
        })
        if(like === require('./img/like_cover_white.png')) {
            setLike(require('./img/like_hollow_white.png'))
            reaction(-1, params.id)
            setArticleLikes(articleLikes - 1)
        } else {
            setLike(require('./img/like_cover_white.png'))
            reaction(0, params.id) 
            setArticleLikes(articleLikes + 1)
        }   
    }    
    const showLikers = async () => {
        const response = await api.get(`/api/post/${params.id}`)
        let likersID = []
        likersID = response.data.article.likers
        let likersArr = []
        for(let i = 0; i < likersID.length; i++) {
            const data = await api.get(`/api/user/${likersID[i]}`)
            likersArr.push(data.data.user)
        }
        //Помещение друзей пользователя в состояние
        setLikers([...likersArr].reverse())
    }
    useEffect(() => {
        const getArticle = async () => {
            const response1 = await api.get(`/api/post/${params.id}`)
            setArticleTitle(response1.data.article.title)
            setArticleText(response1.data.article.text)
            setArticleDate(response1.data.article.date)
            setArticleLikes(response1.data.article.likes)
            setArticleComments(response1.data.article.comments)
            setImageUrl(response1.data.article.imageUrl)
            const response2 = await api.get(`/api/getcomment/${params.id}`)
            setComments([...response2.data.comments].reverse())
        }
        getArticle()
        
        const visitArticle = async () => {
            await api.get(`/api/visitpost/${params.id}`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        }
        visitArticle()

        showLikers()
    }, [params])

    useEffect(() => {
        const articleComment = () => {
            setCommentField(
            <div className="comment-field">
                <h2 className="comment-title">Ваш комментарий...</h2>
                <textarea className="comment-area" onChange={(e) => setCommentValue(e.target.value)} value={commentValue}></textarea>
                <button onClick={sendComment} className="send-comment">Отправить</button>
            </div>)
        }
        articleComment()
    }, [commentValue])

    return (
        <div className="article-post" style={imageUrl === 'user.png' ? {backgroundColor: 'rgb(20, 20, 32)'} : {backgroundColor: 'white'}}>
            {imageUrl === 'user.png' ? <Loader ml={'0%'} />
            : <div>
                <div className="ahead">
                    <h1 className="atitle">{articleTitle}</h1>
                    <p className="adate">{articleDate}</p>
                </div>{
                    imageUrl !== 'none.png' ? <img className="article-img" src={process.env.REACT_APP_API_URL + '/articles/' + imageUrl} width="300" alt="articleimg" />
                    : <div class="article-img fakeimg"></div>
                }
                
                <p className="atext">{articleText}</p>
                <div className="like-div">
                    <div className="l_and_c_foto">
                            <p className="foto-likes" onClick={(e) => mark(e)}><img width="30" src={like} alt="like"/>{articleLikes}</p>
                            <p className="foto-likes" onClick={(e) => comm(e, obj)}><img width="26" src={commentIcon} alt="comment"/>{articleComments}</p>
                    </div>
                    <Likers likers={likers} likersDisplay={likersDisplay} />
                </div>
                
                {commentField}
                {comments.map((el) => <UserArticleComment key={Date.now().toString() - Math.random()} comment={el.comment} date={el.date} user={el.user} id={el._id} articleComments={articleComments} setArticleComments={setArticleComments} comments={comments} setComments={setComments} />)}
            </div> }
            
        </div>
    )
}

export default UserArticle