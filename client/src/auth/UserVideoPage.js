import React, {useState, useEffect, useContext} from "react"
import { useParams } from "react-router"
import useDate from "../common_hooks/date.hook"
import api from "./api/auth"
import "./styles/article.css"
import "./styles/fotography.css"
import UserVideoComment from "./parts/UserVideoComment"
import Likers from "./parts/Likers"
import Loader from "../common_components/Loader"
import { AuthContext } from "../context/AuthContext"
import useFiles from "../common_hooks/files.hook"

const UserVideoPage = () => {
    //Страница поста пользователя
    const auth = useContext(AuthContext)
    //Получение параметров
    const params = useParams()
    //Подключение иконки комментария
    const commentIcon = require('./img/comment_white.png') 
    //Получение функции для увеличивания количества лайков и комментариев и получения даты из кастомных хуков
    const {getCurrentDate} = useDate()
    //Инициализация состояний для названия поста, его текста, даты, url изображения, поля комментирования, комментария, и всех комментариев
    const [articleTitle, setArticleTitle] = useState('')
    const [articleText, setArticleText] = useState('')
    const [articleDate, setArticleDate] = useState('')
    const [imageUrl, setImageUrl] = useState('user.png')
    const [commentField, setCommentField] = useState(null)
    const [commentValue, setCommentValue] = useState('Ваш комментарий')
    const [comments, setComments] = useState([])
    const [articleLikes, setArticleLikes] = useState('')
    const [articleComments, setArticleComments] = useState('')
    const [like, setLike] = useState(require('./img/like_hollow_white.png'))
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('block')

    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('./img/like_cover_white.png'))
            }
        })
    }, [likers, auth])
    const comm = (e, obj) => {
        e.stopPropagation()
        setArticleComments(articleComments + 1)
        window.location = `/video/${obj.id}/comment`
    }
    const showLikers = async () => {
        const response = await api.get(`/api/video/${params.id}`)
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
    const obj = {articleTitle, articleDate, imageUrl, articleLikes, articleComments, comments, id: params.id}
    const sendComment = async () => {
        const currentDate = getCurrentDate()
        await api.post(`/api/commentvideo/${params.id}`, {
            comment: commentValue, 
            date: currentDate, 
            articleID: params.id, 
        }, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })
        window.location = `/video/${params.id}`
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
            await api.post(`/api/likevideo`, {sub: true, id: params.id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            setArticleLikes(articleLikes - 1)
        } else {
            setLike(require('./img/like_cover_white.png'))
            await api.post(`/api/likevideo`, {id: params.id}, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            setArticleLikes(articleLikes + 1)
        }   
    }    
    useEffect(() => {
        const getArticle = async () => {
            const response1 = await api.get(`/api/video/${params.id}`)
            setArticleTitle(response1.data.video.title)
            setArticleText(response1.data.video.text)
            setArticleDate(response1.data.video.date)
            setArticleLikes(response1.data.video.likes)
            setArticleComments(response1.data.video.comments)
            setImageUrl(response1.data.video.imageUrl)
            const response2 = await api.get(`/api/videocomments/${params.id}`)
            setComments([...response2.data.comments].reverse())
        }
        getArticle()
        const articleComment = () => {
            setCommentField(
            <div className="comment-field">
                <h2 className="comment-title">Ваш комментарий...</h2>
                <textarea className="comment-area" onChange={(e) => setCommentValue(e.target.value)} value={commentValue}></textarea>
                <button onClick={sendComment} className="send-comment">Отправить</button>
            </div>)
        }
        const visitVideo = async () => {
            await api.get(`/api/visitvideo/${params.id}`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        }
        visitVideo()
        articleComment()
        showLikers()

    }, [params, commentValue])

    return (
        <div className="article-post" style={imageUrl === 'user.png' ? {backgroundColor: 'rgb(20, 20, 32)'} : {backgroundColor: 'white'}}>
            {imageUrl === 'user.png' ? <Loader ml={'0%'} />
            : <div>
                <div className="ahead">
                    <h1 className="atitle">{articleTitle}</h1>
                    <p className="adate">{articleDate}</p>
                </div>
                {imageUrl !== 'none.png' ? <video width="480" height="360" controls style={{borderRadius: '11px'}} src={process.env.REACT_APP_API_URL + '/uservideos/' + imageUrl}>
                </video> : <></>}
                
                <p className="atext">{articleText}</p>
                <div className="like-div">
                    <div className="l_and_c_foto">
                            <p className="foto-likes" onClick={(e) => mark(e)}><img width="30" src={like} alt="like"/>{articleLikes}</p>
                            <p className="foto-likes" onClick={(e) => comm(e, obj)}><img width="26" src={commentIcon} alt="comment"/>{articleComments}</p>
                    </div>
                    <Likers likers={likers} likersDisplay={likersDisplay} />
                </div>
                
                {commentField}
                {comments.map((el) => <UserVideoComment key={Date.now().toString() - Math.random()} comment={el.comment} date={el.date} user={el.user} id={el._id} articleComments={articleComments} setArticleComments={setArticleComments} comments={comments} setComments={setComments} />)}
            </div> }
            
        </div>
    )
}

export default UserVideoPage