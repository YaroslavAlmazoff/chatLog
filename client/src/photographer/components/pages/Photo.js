import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../../../auth/api/auth'
import { Link } from 'react-router-dom'
import '../../styles/photo.css'
import '../../styles/photo-card.css'

const Photo = () => {
    const parameters = useParams()
    const [photo, setPhoto] = useState({})
    const [likes, setLikes] = useState(0)
    const [likeImg, setLikeImg] = useState(require('../../img/blue.png'))

    useEffect(() => {
        if(localStorage.getItem(parameters.id) === 'liked') {
            setLikeImg(require('../../img/red.png'))
        } 
        const getPhoto = async () => {
            const response = await api.get(`/api/photo/photo/${parameters.id}`)
            setPhoto(response.data.photo)
        }
        getPhoto()
        const getLikes = async () => {
            const response = await api.get(`/api/photo/getlikes/${parameters.id}`)
            setLikes(response.data.likes)
        }
        getLikes()
    }, [parameters])

    const like = async () => {
        if(localStorage.getItem(parameters.id) === 'liked') {
            return
        }
        localStorage.setItem(parameters.id, 'liked')
        setLikeImg(require('../../img/red.png'))
        await api.post(`/api/photo/setlikes/${parameters.id}`, {likes: likes + 1})
        setLikes(prev => prev + 1)
    }


    return (
        <div className="photo">
            <img className='photo-img-big' src={process.env.REACT_APP_API_URL + `/photos/${photo.name}`} alt="ph" />
            <div onClick={like} className='photo-like-wrap'>
                <img className='photo-like-img' src={likeImg} alt="like" />
                <span style={{position: 'absolute', color: 'white', marginTop: '3px', marginLeft: '-18px'}}>{likes}</span>
            </div>
            <div className="photo-info">
                <p className="photo-name">{photo.title}</p>
                <p className="photo-author">Автор: <Link className='photo-author-link' to={`/user/${photo.authorId}`}>{photo.authorName} {photo.authorSurname}</Link></p>
                <div className='photo-not-important'>
                    {photo.description ? <p className='photo-parameter'>{photo.description}</p> : <></>}
                    {photo.place ? <p className='photo-parameter'>Место съёмки: <span style={{color: 'rgb(0, 140, 255'}}>{photo.place}</span></p> : <></>}
                    {photo.time ? <p className='photo-parameter'>Дата и время съёмки: <span style={{color: 'rgb(0, 140, 255'}}>{photo.time}</span></p> : <></>}
                    {photo.params ? <p className='photo-parameter'>Параметры съёмки: <span style={{color: 'rgb(0, 140, 255'}}>{photo.params}</span></p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Photo