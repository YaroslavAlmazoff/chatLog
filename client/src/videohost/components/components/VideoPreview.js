import React from "react";

const VideoPreview = ({videoDisplay, videoUrl}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{display: videoDisplay}}>
            <video width="300" height="200" controls src={videoUrl}>
            </video>
        </div>
    )
}

export default VideoPreview