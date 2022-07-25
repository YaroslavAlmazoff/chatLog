import { useState, useEffect } from "react"
import api from '../../auth/api/auth'
import {useParams} from 'react-router'
import useWord from "../../common_hooks/divideWord.hook"
import '../styles/ad.css'
import '../styles/main.css'

const Ad = () => {
    const {firstLetter} = useWord()
    const [ad, setAd] = useState({
        images: ['']
    })
    const params = useParams()

    useEffect(() => {
        const getAd = async () => {
            const response = await api.get(`/api/ad/ad/${params.id}`)
            setAd(response.data.ad)
        }
        getAd()
    }, [params])

    return (
        <div className="ad">
            <img className="ad-image" src={process.env.REACT_APP_API_URL + '/ads/' + ad.images[0]} alt="ad" />
            <div className="ad-images">
                {ad.images.map(el => <img className="ad-small-image" src={process.env.REACT_APP_API_URL + '/ads/' + el} alt="ad" />)}
            </div>
            <div className="ad-info">
                <div className="ad-data">
                    <p className="ad-title">{ad.title}</p>
                    <p className="ad-description">{ad.description}</p>
                    <p className="ad-title-price"><span style={{color: 'white'}}>Стоимость: </span>{ad.price}&#8381;</p>
                    <p className="ad-city">🏠{firstLetter(ad.city)}</p>
                    <p className="ad-date">{ad.date}</p>
                </div>
                <div className="ad-contact">
                    <button className="ads-main-button">Связаться с объявителем</button>
                    {ad.phone ? <p className="ad-phone">Тел.: {ad.phone}</p> : <></>}
                </div>
            </div>
            
        </div>
    )
}

export default Ad