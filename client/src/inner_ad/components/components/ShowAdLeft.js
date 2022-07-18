import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Card from "./Card"

const ShowAd = ({width}) => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const response = await api.get('/api/innerad/all')
            console.log(response)
            setAds(response.data.ads)
            setInterval(() => {
                setAds(ads.reverse())
            },3000)
        }
        getAds()
    }, [ads])

    return (
        <div style={{width}}>
            {ads.map(item => <Card item={item} />)}
        </div>
    )
}

export default ShowAd