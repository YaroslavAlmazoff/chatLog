import { useState, useEffect } from "react"
import api from '../../auth/api/auth'
import {useParams} from 'react-router'
import '../styles/ad.css'

const Ad = () => {
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
                <p className="ad-title">{ad.title}</p>
                <p className="ad-description">{ad.description}</p>
                <p className="ad-title-price">{ad.price}&#8381;</p>
                <p className="ad-city">{ad.city}</p>
                <p className="ad-date">{ad.date}</p>
            </div>
        </div>
    )
}

export default Ad