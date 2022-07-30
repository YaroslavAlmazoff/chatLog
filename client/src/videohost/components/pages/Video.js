import { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import api from '../../../auth/api/auth'
import RecommendedVideosVideoPage from '../components/RecomendedVideosVideoPage'
import SameVideos from '../components/SameVideos'
import VideoFrame from '../components/VideoFrame'

const Video = () => {
    const params = useParams()
    const [video, setVideo] = useState({})

    useEffect(() => {
        const getVideo = async () => {
            const response = await api.get(`/api/videohost/videos/video/${params.id}`)
            setVideo(response.data.video)
        }
        getVideo()
    }, [params])
    useEffect(() => {
        const view = async () => {
            const response = await api.get(`/api/videohost/videos/view/${video._id}`)
            console.log(response)
        }
        view()
    }, [video])

    return (
        <div className="videohost-video">
            <RecommendedVideosVideoPage />
            <VideoFrame video={video} />
            <SameVideos category={video ? video.category : 'default'} />
        </div>
    )
}

export default Video