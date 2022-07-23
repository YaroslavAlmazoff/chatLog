import { useState, useEffect } from "react"
import api from '../../auth/api/auth'
import {useParams} from 'react-router'

const Ad = () => {
    const [ad, setAd] = useState({})
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
            <img className="ad-item-image" src={process.env.REACT_APP_API_URL + '/ads/' + ad.images[0]} alt="ad" />
            <div className="ad-item-images">
                {ad.images.map(el => <img className="ad-item-small-image" src={process.env.REACT_APP_API_URL + '/ads/' + el} alt="ad" />)}
            </div>
            <div className="ad-item-info">
                <p className="ad-item-title">{ad.title}</p>
                <p className="ad-description">{ad.description}</p>
                <p className="ad-title-price">{ad.price}&#8381;</p>
                <p className="ad-item-city">{ad.city}</p>
                <p className="ad-item-date">{ad.date}</p>
            </div>
        </div>
    )
}

export default Ad