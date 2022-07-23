import React from "react";

const ImagePreview = ({imageUrl}) => {
    //Предпросмотр изображения для загрузки нового поста
    return (
        <div style={{height: '100%',display: 'inline',border: '1px solid rgb(0, 140, 255)', margin: '5px'}}>
            <img height="200" src={imageUrl} alt="preview" style={{height: '100%'}} />
        </div>
    )
}

export default ImagePreview