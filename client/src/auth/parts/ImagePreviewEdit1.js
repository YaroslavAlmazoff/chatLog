import React from "react";

const ImagePreviewEdit1 = ({imagePreviewDisplay1, imagePreviewUrl1}) => {
    //Предпросмотр изображения для загрузки аватарки
    return (
        <div style={{display: imagePreviewDisplay1}}>
            <img height="200" src={imagePreviewUrl1} alt="preview" />
        </div>
    )
}

export default ImagePreviewEdit1