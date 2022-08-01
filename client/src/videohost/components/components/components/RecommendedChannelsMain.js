import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../../../context/AuthContext"
import api from '../../../../auth/api/auth'
import ChannelItem from "./ChannelItem"

const RecommendedChannelsMain = () => {
    const auth = useContext(AuthContext)
    const [channels, setChannels] = useState([])

    useEffect(() => {
        const getChannels = async () => {
            const response = await api.get(`/api/videohost/channels/recommendedmain/${auth.userId}`)
            setChannels(response.data.channels)
        }
        getChannels()
    }, [auth])

    return (
        <div className="videohost-main-recommended-channels">
            {
                channels.map(item => <ChannelItem item={item} />)
            }
        </div>
    )
}

export default RecommendedChannelsMain