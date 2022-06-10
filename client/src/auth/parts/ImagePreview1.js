import React from "react";

const ImagePreview1 = ({imagePreviewDisplay1, imagePreviewUrl1}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{display: imagePreviewDisplay1}}>
            <img height="200" src={imagePreviewUrl1} alt="preview" />
        </div>
    )
}

export default ImagePreview1