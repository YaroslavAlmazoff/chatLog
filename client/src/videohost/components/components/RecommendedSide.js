import RecommendedChannelsMain from "./components/RecommendedChannelsMain"
import RecommendedVideosMain from "./RecommendedVideosMain"

const RecommendedSide = () => {

    return (
        <div className="videohost-main-recommended-side">
            <RecommendedVideosMain />
            <RecommendedChannelsMain />
        </div>
    )
}

export default RecommendedSide