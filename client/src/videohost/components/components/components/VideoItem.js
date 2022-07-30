import { useEffect, useState } from 'react'
import '../../../styles/video-item.css'
import api from '../../../../auth/api/auth'

const VideoItem = (item) => {
    const [author, setAuthor] = useState('')

    useEffect(() => {
        const getAuthor = async () => {
            const response = await api.get(`/api/videohost/videos/author/${item.channel}`)
            setAuthor(response.data.name)
        }
        getAuthor()
    }, [item])

    return (
        <div className="videohost-video-item">
            <img className="videohost-video-item-preview" src={process.env.REACR_APP_API_URL + '/videopreviews/' + item.previewUrl} alt="" />
            <img className="videohost-video-item-play" src={require('../../../img/play.png')} alt="" />
            <strong className="videohost-video-item-author">{author}</strong>
            <p className='videohost-video-item-title'>{item.title}</p>
        </div>
    )
}

export default VideoItem