import ChannelActions from "./components/ChannelActions"
import ChannelInfo from "./components/ChannelInfo"

const Head = () => {
    return (
        <div className="videohost-channel-head">
            <ChannelInfo />
            <ChannelActions />
        </div>
    )
}

export default Head