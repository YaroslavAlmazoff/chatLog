import { useContext, useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import VideoItem from "./components/VideoItem"

const RecommendedVideosVideoPage = () => {
    const auth = useContext(AuthContext)
    const [videos, setVideos] = useState({})

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.get(`/api/videohost/videos/recommendedvideopage/${auth.userId}`)
            setVideos(response.data.videos)
        }
        getVideos()
    }, [auth])


    return (
        <div className="videohost-recommended-videos-video-page">
            <p style={{color: 'white', fontSize: '16pt'}}></p>
            {videos.map(item => <VideoItem item={item} />)}
        </div>
    )
}

export default RecommendedVideosVideoPage