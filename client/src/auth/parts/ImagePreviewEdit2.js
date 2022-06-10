import React from "react";

const ImagePreviewEdit2 = ({imagePreviewDisplay2, imagePreviewUrl2}) => {
    //Предпросмотр изображения для загрузки баннера
    return (
        <div style={{display: imagePreviewDisplay2}}>
            <img height="200" src={imagePreviewUrl2} alt="preview" />
        </div>
    )
}

export default ImagePreviewEdit2