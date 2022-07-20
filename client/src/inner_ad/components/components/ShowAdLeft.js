import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Card from "./Card"

const ShowAd = ({width}) => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const response = await api.get('/api/innerad/random')
            console.log(response)
            setAds(response.data.ads)
        }
        getAds()
        setInterval(() => {
            getAds()
        }, 5000)
    }, [])

    return (
        <div style={{width}}>
            {ads.map(item => <Card item={item} />)}
        </div>
    )
}

export default ShowAd