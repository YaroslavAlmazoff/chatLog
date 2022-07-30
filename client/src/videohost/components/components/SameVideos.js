import {useEffect, useState} from 'react'
import api from '../../../auth/api/auth'
import VideoItem from '../components/components/VideoItem'

const SameVideos = ({category}) => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.post('/api/videohost/videos/same', {category})
            setVideos(response.data.videos)
        }
        getVideos()
    }, [category])

    return (
        <div className="videhost-same-videos">
            <p className="videohost-same-videos-title">Похожие видео</p>
            <div className="videohost-same-videos-list">
                {videos.map(item => <VideoItem item={item} />)}
            </div>
        </div>
    )
}

export default SameVideos