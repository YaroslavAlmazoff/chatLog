import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../../../auth/api/auth'
import { Link } from 'react-router-dom'
import '../../styles/photo.css'

const Photo = () => {
    const parameters = useParams()
    const [photo, setPhoto] = useState({})
    const [likes, setLikes] = useState(0)

    useEffect(() => {
        const getPhoto = async () => {
            const response = await api.get(`/api/photo/photo/${parameters.id}`)
            setPhoto(response.data.photo)
        }
        getPhoto()
    }, [parameters])

    const like = async () => {
        const response = await api.post('/api/photo/setlikes', {likes})
        setLikes(response.data.likes)
    }


    return (
        <div className="photo">
            <img className='photo-img-big' src={process.env.REACT_APP_API_URL + `/photos/${photo.name}`} alt="ph" />
            <div className="photo-info">
                <p className="photo-name">{photo.title}</p>
                <p className="photo-author">Автор: <Link to={`/user/${photo.authorId}`}>{photo.authorName} {photo.authorSurname}</Link></p>
                <div className='photo-not-important'>
                    {photo.description ? <p className='photo-parameter'>{photo.description}</p> : <></>}
                    {photo.place ? <p className='photo-parameter'>Место съёмки: {photo.place}</p> : <></>}
                    {photo.time ? <p className='photo-parameter'>Дата и время съёмки: {photo.time}</p> : <></>}
                    {photo.params ? <p className='photo-parameter'>Параметры съёмки: {photo.params}</p> : <></>}
                </div>
                <div onClick={like} className='photo-like-wrap'>
                    <img className='photo-like-img' src={require('../../img/like.png')} alt="like" />
                </div>
            </div>
        </div>
    )
}

export default Photo