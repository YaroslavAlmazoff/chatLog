import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Card from "./Card"

const ShowAd = () => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const response = await api.get('/api/innerad/all')
            console.log(response)
            setAds(response.data.ads)
        }
        getAds()
    }, [])

    return (
        <div style={{width: '28%'}}>
            {ads.map(item => <Card item={item} />)}
        </div>
    )
}

export default ShowAd