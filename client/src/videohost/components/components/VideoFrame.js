const VideoFrame = ({video}) => {

    return (
        <div className="videohost-video-frame">
            <video width="300" height="200" className="videohost-video-frame-video" controls src={process.env.REACT_APP_API_URL + '/videohostvideos/' + video.videoUrl}></video>
        </div>
    )
}

export default VideoFrame