import React from "react";

const ImagePreview = ({imageDisplay, imageUrl}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{display: imageDisplay, height: '100%'}}>
            <img height="200" src={imageUrl} alt="preview" style={{height: '100%'}} />
        </div>
    )
}

export default ImagePreview