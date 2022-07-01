import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import "../styles/fotography.css"
import api from "../api/auth"
import useDate from "../../common_hooks/date.hook"
import Likers from "./Likers"
import UserFotoComment from "./UserFotoComment"
import useRandom from "../../common_hooks/random.hook"
import Loader from "../../common_components/Loader"
import usePosts from "../hooks/usePosts"
import { AuthContext } from "../../context/AuthContext"
import Smile from "../../messenger/components/parts/Smile"
import { smiles } from "../../messenger/components/pages/smiles"

const Fotography = () => {
    const auth = useContext(AuthContext)
    const {deleteFoto} = usePosts()
    const params = useParams()
    const [foto, setFoto] = useState({likes: 0, comments: 0, imageUrl: 'user.png'})
    const [fotoComments, setFotoComments] = useState([])
    const commentIcon = require('../img/comment_white.png') 
    //Получение функции для увеличивания количества лайков и комментариев и получения даты из кастомных хуков
    const {getCurrentDate} = useDate()
    const {randomKey} = useRandom()
    //Инициализация состояний для названия поста, его текста, даты, url изображения, поля комментирования, комментария, и всех комментариев
    const [commentField, setCommentField] = useState(null)
    const [commentValue, setCommentValue] = useState('Ваш комментарий')
    const [articleLikes, setArticleLikes] = useState('')
    const [like, setLike] = useState(require('../img/like_hollow_white.png'))
    const [likers, setLikers] = useState([])
    const [likersDisplay, setLikersDisplay] = useState('block')
    const [smilesDisplay, setSmilesDisplay] = useState('none')
    useEffect(() => {
        likers.forEach(el => {
            if(el._id === auth.userId) {
                setLike(require('../img/like_cover_white.png'))
            }
        })
    }, [likers, auth])
    const getFotoComments = async () => {
        const response = await api.get(`/api/fotocomments/${params.id}`)
        setFotoComments([...response.data.comments].reverse())
    }
    const comm = (e) => {

    }
    const mark = async (e) => {
        e.stopPropagation()
        likers.forEach(el => {
            if(el._id === auth.userId) {
                return
            }
        })
        if(like === require('../img/like_cover_white.png')) {
            setArticleLikes(articleLikes - 1)
            setLike(require('../img/like_hollow_white.png'))
            await api.post(`/api/likefoto/${params.id}`, {sub: true, id: params.id}, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
        } else {
            setArticleLikes(articleLikes + 1)
            setLike(require('../img/like_cover_white.png'))
            await api.post(`/api/likefoto/${params.id}`, {id: params.id}, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
        }
        window.location = `/fotography/${params.id}`
    }
    const showLikers = async () => {
        const response = await api.get(`/api/fotobyurl/${params.id}`)
        let likersID = []
        likersID = response.data.foto.likers
        let likersArr = []
        for(let i = 0; i < likersID.length; i++) {
            const data = await api.get(`/api/user/${likersID[i]}`)
            likersArr.push(data.data.user)
        }
        //Помещение друзей пользователя в состояние
        setLikers([...likersArr].reverse())
    }
    const sendComment = async () => {
        const currentDate = getCurrentDate()
        await api.post(`/api/commentfoto/${params.id}`, {
            comment: commentValue, 
            date: currentDate, 
            articleID: params.id, 
        }, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })    
        window.location = `/fotography/${params.id}`
    }
    const addSmile = (code) => {
        setCommentValue((prev => prev + code))
    }
    const showSmiles = () => {
        if(smilesDisplay === 'none') {
            setSmilesDisplay('block')
            setTimeout(() => {
                setSmilesDisplay('none')
            }, 10000)
        } else {
            setSmilesDisplay('none')
        }
        console.log('sesh')
    }  
    useEffect(() => {
        const getFoto = async () => {
            const response = await api.get(`/api/fotobyurl/${params.id}`)
            setFoto(response.data.foto)
        }
        getFotoComments()
        getFoto()
        showLikers()
        const fotoComment = () => {
            setCommentField(
            <div className="comment-field">
                <div className="room-smiles" style={{display: smilesDisplay}}>
                        {smiles.map(el => <Smile key={el.code} el={el} addSmile={addSmile} />)}
                </div>
                <h2 className="comment-title">Напишите комментарий</h2>
                <textarea className="comment-area" value={commentValue} onChange={(e) => setCommentValue(e.target.value)}></textarea>
                <img onClick={showSmiles} className="upload-image" src={require(`../../messenger/img/smile.png`)} alt='img'/>
                <button onClick={sendComment} className="send-comment">Отправить</button>
            </div>)
        }
        const visitFoto = async () => {
            await api.get(`/api/visitfoto/${params.id}`)
        }
        visitFoto()
        fotoComment()
    }, [params, commentValue])
    return (
        <div className="dark-wrapper" style={foto.imageUrl === 'user.png' ? {backgroundColor: 'rgb(20, 20, 32)'} : {backgroundColor: 'white'}}>
            {foto.imageUrl === 'user.png' ? <Loader ml={'0%'} />
            :
            <div className="window" style={foto.imageUrl === 'user.png' ? {backgroundColor: 'rgb(20, 20, 32)'} : {backgroundColor: 'white'}}>
                <img className="fotography" src={process.env.REACT_APP_API_URL + '/userfotos/' + foto.imageUrl} alt="foto" />
                {foto.user === auth.userId ? <p onClick={() => deleteFoto(params.id)} className="delete-user-foto">Удалить фотографию</p>: <></>}
                <div className="like-div">
                    <div className="l_and_c_foto">
                        <p onClick={(e) => mark(e)} className="foto-likes"><img width="30" src={like} alt="like"/>{foto.likes}</p>
                        <p onClick={(e) => comm(e)} className="foto-likes"><img width="26" src={commentIcon} alt="comment"/>{foto.comments}</p>
                    </div>
                    <Likers likers={likers} likersDisplay={likersDisplay} />
                </div>
                
                <div style={{marginLeft: 0}}>
                {commentField}
                {fotoComments.map((el) => <UserFotoComment key={randomKey()} comment={el.comment} date={el.date} user={el.user} id={el._id} setFotoComments={setFotoComments} fotoComments={fotoComments} foto={foto} setFoto={setFoto}/>)}
                </div>
            </div>
            }
        </div> 
    )
}

export default Fotography