import { useContext } from "react"
import { ChannelContext } from "../../../context/ChannelContext"

const ChannelBottomInfo = () => {
    const {name} = useContext(ChannelContext)

    return (
        <div className="videohost-channel-bottom-info">
            <p className="videohost-channel-name">{name}</p>
        </div>
    )
}

export default ChannelBottomInfo