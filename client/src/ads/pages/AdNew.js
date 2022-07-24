import { useEffect, useState } from "react"
import api from '../../auth/api/auth'
import useDate from "../../common_hooks/date.hook"
import AdItem from "../components/AdItem"
import '../styles/main.css'

const AdNew = () => {
    const {getCurrentDate} = useDate()
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const date = getCurrentDate()
            const response = await api.post('/api/ad/new', {date})
            setAds(response.data.ads)
        }
        getAds()
    }, [])

    return (
        <div className="ads-new">
            <div className="ads-new-content">
                <p className="ads-new-title">Новые объявления</p>
                {ads.map(item => <AdItem item={item} />)}
            </div>
        </div>
    )
}

export default AdNew