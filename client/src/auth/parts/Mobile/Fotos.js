import React from "react";
import useRandom from "../../../common_hooks/random.hook";
import "../../styles/user.css"
import { useNavigate } from "react-router";
import FotoItem from "../FotoItem";

const Fotos = ({userFotos}) => {
    //Правая часть страницы пользователя - добавление фотографий и список фотографий
    const {randomKey} = useRandom()
    const navigate = useNavigate()
    const showFotography = (img) => {
        navigate(`/fotography/${img}`)
    }
    return (
        <div className="user-fotos-mobile">
            <p className="user-fotos-title-mobile">Фотографии {userFotos.length}</p>
            {userFotos.map(el => <div className="foto-div-mobile" onClick={() => showFotography(el.imageUrl)} key={randomKey()}><FotoItem imageUrl={el.imageUrl} /></div>)}
        </div>
    )
}

export default Fotos