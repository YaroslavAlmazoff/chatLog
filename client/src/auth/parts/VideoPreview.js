import React from "react";

const VideoPreview = ({videoPreviewDisplay, videoPreviewUrl}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{display: videoPreviewDisplay}}>
            <video width="300" height="200" controls>
                <source src={videoPreviewUrl} type='video/ogg; codecs="theora, vorbis"' />
                <source src={videoPreviewUrl} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                <source src={videoPreviewUrl} type='video/webm; codecs="vp8, vorbis"'/>
            </video>
        </div>
    )
}

export default VideoPreview