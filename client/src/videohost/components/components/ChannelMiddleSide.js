import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import api from '../../../auth/api/auth'
import { ChannelContext } from "../context/ChannelContext"

const ChannelMiddleSide = () => {
    const params = useParams()
    const [videosCount, setVideosCount] = useState(0)
    const {subscribers} = useContext(ChannelContext)

    useEffect(() => {
        const getVideosCount = async  () => {
            const response = await api.get(`/api/videohost/videos/videoscount/${params.id}`)
            setVideosCount(response.data.count)
        }
        getVideosCount()
    }, [params])

    return (
        <div className="videohost-channel-middle-side">
            <p className="videohost-channel-middle-info">{videosCount} видео</p>
            <p className="videohost-channel-middle-info">{subscribers} подписчиков</p>
        </div>
    )
}

export default ChannelMiddleSide