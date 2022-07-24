import { useEffect, useState } from "react"
import api from '../../auth/api/auth'
import AdItem from "./AdItem"
import useDate from '../../common_hooks/date.hook'
import '../styles/main.css'

const NewBlock = () => {
    const {getCurrentDate} = useDate()
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const date = getCurrentDate()
            const response = await api.get(`/api/ad/new/${date}`)
            setAds(response.data.ads)
        }
        getAds()
    }, [getCurrentDate])

    return (
        <div className="ads-new-categories">
            <p style={{color: 'rgb(0, 140, 255)'}}>Новые объявления</p>
            {ads.length 
            ? ads.map(item => <AdItem item={item} />)
            : <p className="ads-main-block-text">Здесь пока что ничего нет</p>}
        </div>
    )
}

export default NewBlock