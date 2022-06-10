import React from "react";

const ImagePreview2 = ({imagePreviewDisplay2, imagePreviewUrl2}) => {
    //Предпросмотр изображения для загрузки фотографии
    return (
        <div style={{display: imagePreviewDisplay2}}>
            <img height="200" src={imagePreviewUrl2} alt="preview" />
        </div>
    )
}

export default ImagePreview2