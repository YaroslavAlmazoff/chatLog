import { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import api from '../../../auth/api/auth'
import VideoItem from './components/'

const ChannelVideos = () => {
    const params = useParams()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.get(`/api/videohost/videos/channelvideos/${params.id}`)
            setVideos(response.data.videos)
        }
        getVideos()
    }, [params])

    return (
        <div className="videohost-channel-videos">
            {videos.map(item => <VideoItem item={item} />)}
        </div>
    )
}

export default ChannelVideos