import React from "react";

const PhotoPreview = ({imageDisplay, imageUrl}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{display: imageDisplay}}>
            <img height="200" src={imageUrl} alt="preview" />
        </div>
    )
}

export default PhotoPreview