import React from "react";
import useRandom from "../../../common_hooks/random.hook";
import "../../styles/user.css"
import { useNavigate, useParams } from "react-router";
import FotoItemMobile from "./FotoItemMobile";
import ImagePreview2 from "../ImagePreview2";
import useDate from "../../../common_hooks/date.hook";
import usePosts from "../../hooks/usePosts";

const Fotos = ({userFotos, isOwner, showNotifications, getFile2, emitOpen2, fileRef2, file2, setUserFotos, imagePreviewUrl2, imagePreviewDisplay2}) => {
    const params = useParams()
    const {getCurrentDate} = useDate()
    const {sendFoto} = usePosts()
    //Правая часть страницы пользователя - добавление фотографий и список фотографий
    const {randomKey} = useRandom()
    const navigate = useNavigate()
    const showFotography = (img) => {
        navigate(`/fotography/${img}`)
    }  
    return (
        <div className="user-fotos-mobile">
            <div className="fotos-actions">
                <p className="user-fotos-title-mobile">Фотографии {userFotos.length}</p>
                {isOwner ? <div>
                        <div>
                            <img className="notice-img" onClick={showNotifications} width="35" src={require('../img/notice.png')} alt="notice" />
                        </div>
                        <input onChange={(e) => getFile2(e)} ref={fileRef2} type="file" />
                        <button onClick={(e) => emitOpen2(e)} className="user-add-foto-right">Добавить фотографию</button>
                        <button onClick={() => sendFoto(file2, getCurrentDate, params, userFotos, setUserFotos)} className="user-add-foto-right">Отправить фотографию</button>
                        <ImagePreview2 imagePreviewUrl2={imagePreviewUrl2} imagePreviewDisplay2={imagePreviewDisplay2} />
                    </div> : <></>}
            </div>
            {userFotos.map(el => <div className="foto-div-mobile" onClick={() => showFotography(el.imageUrl)} key={randomKey()}><FotoItemMobile imageUrl={el.imageUrl} /></div>)}
        </div>
    )
}

export default Fotos