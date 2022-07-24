import { useEffect, useState, useContext } from "react"
import api from '../../auth/api/auth'
import AdItem from "./AdItem"
import {AuthContext} from '../../context/AuthContext'
import '../styles/main.css'

const CityBlock = () => {
    const auth = useContext(AuthContext)
    const [ads, setAds] = useState([])
    const [city, setCity] = useState(false)

    useEffect(() => {
        if(!auth.userId) return 
        const getAds = async () => {
            const response = await api.get(`/api/ad/city/${auth.userId}`)
            setAds(response.data.ads)
            setCity(response.data.message)
        }
        getAds()
    }, [auth.userId])

    const goEdit = () => {
        window.location = '/editprofile'
    }

    return (
        <div className="ads-new-categories">
            <p style={{color: 'rgb(0, 140, 255)'}}>Новые объявления</p>
            {city && ads.length 
                ? ads.map(item => <AdItem item={item} />)
                : <>{city && !ads.length
                    ? <p className="ads-main-block-text">Нет подходящих объявлений :(</p>
                    : <>{!city 
                        ? <p className="ads-main-block-text">Укажите свой город <span onClick={goEdit} style={{color: 'rgb(0, 140, 255)'}}>здесь</span></p>
                        : <></>
                    }</>
                }</>
            }
        </div>
    )
}

export default CityBlock