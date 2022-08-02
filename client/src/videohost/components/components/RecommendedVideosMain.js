import { useContext, useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import VideoItem from "./components/VideoItem"

const RecommendedVideosMain = () => {
    const auth = useContext(AuthContext)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.get(`/api/videohost/videos/recommendedmain/${auth.userId}`)
            setVideos(response.data.videos)
        }
        getVideos()
    }, [auth])


    return (
        <div className="videohost-main-recommended-videos">
            <p style={{color: 'white', fontSize: '16pt'}}></p>
            {videos.map(item => <VideoItem item={item} />)}
        </div>
    )
}

export default RecommendedVideosMain