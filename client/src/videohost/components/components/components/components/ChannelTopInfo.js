import { useContext } from "react"
import { ChannelContext } from "../../../context/ChannelContext"

const ChannelTopInfo = () => {
    const {description, avatarUrl} = useContext(ChannelContext)

    return (
        <div className="videohost-channel-top-info">
            <img className="videohost-channel-avatar" src={process.env.REACT_APP_API_URL + '/channelavatars/' + avatarUrl} alt="" />
            <p className="videohost-channel-description">{description}</p>
        </div>
    )
}

export default ChannelTopInfo