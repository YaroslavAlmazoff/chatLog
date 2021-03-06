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
            console.log(response)
            setAds(response.data.ads)
            setCity(response.data.message)
        }
        getAds()
    }, [auth.userId])

    const goEdit = () => {
        window.location = '/editprofile'
    }
    const gotoCity = () => {
        window.location = '/ad/new'
    }

    return (
        <div className="ads-new-categories">
            <p onClick={gotoCity} style={{color: 'rgb(0, 140, 255)', cursor: 'pointer'}}>Объявления в вашем городе</p>
            {city && ads.length 
                ? ads.map(item => <AdItem item={item} width={'25%'} />)
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