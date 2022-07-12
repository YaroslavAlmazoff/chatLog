import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import api from '../../../auth/api/auth'
import '../../styles/photo-card.css'

const PhotoCard = ({item}) => {
    const [likes, setLikes] = useState(0)
    const [likeImg, setLikeImg] = useState(require('../../img/blue.png'))

    useEffect(() => {
        const getLikes = async () => {
            const response = await api.get(`/api/photo/getlikes/${item._id}`)
            setLikes(response.data.likes)
        }
        getLikes()
    }, [item])

    const like = async () => {
        setLikeImg(require('../../img/red.png'))
        const lks = likes + 1
        await api.post(`/api/photo/setlikes/${item._id}`, {likes: lks})
        setLikes(lks)
    }
    const gotoPhoto = () => {
        window.location = `/photo/${item._id}`
    }

    return (
        <div className="photo-card" onClick={gotoPhoto}>
            <img className='photo-img' src={process.env.REACT_APP_API_URL + `/photos/${item.name}`} alt="ph" />
            <div className="photo-info">
                <p className="photo-name">{item.title}</p>
                <p className="photo-author">Автор: <Link className='photo-author-link' to={`/user/${item.authorId}`}>{item.authorName} {item.authorSurname}</Link></p>
                <div onClick={like} className='photo-like-wrap'>
                    <img className='photo-like-img' src={likeImg} alt="like" />
                </div>
            </div>
        </div>
    )
}

export default PhotoCard