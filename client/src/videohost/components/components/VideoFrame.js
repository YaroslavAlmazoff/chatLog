import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from '../../../auth/api/auth'
import VideoMiddleSide from "./components/VideoMiddleSide"

const VideoFrame = ({video}) => {
    const params = useParams()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const getIsAdmin = async () => {
            const response = await api.get(`/api/videohost/videos/isadmin/${params.id}`)
            setIsAdmin(response.data.isAdmin)
        }
        getIsAdmin()
    }, [params])

    return (
        <div className="videohost-video-frame">
            <video width="300" height="200" className="videohost-video-frame-video" controls src={process.env.REACT_APP_API_URL + '/videohostvideos/' + video.videoUrl}></video>
            {isAdmin && <VideoMiddleSide />}
        </div>
    )
}

export default VideoFrame