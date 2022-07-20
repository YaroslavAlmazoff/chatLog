import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Card from "./Card"

const ShowAd = ({width}) => {
    const [ads, setAds] = useState([])

    const getAds = async () => {
        const response = await api.get('/api/innerad/random')
        console.log(response)
        setAds(response.data.ads.reverse())
    }

    useEffect(() => {
        const getAds = async () => {
            const response = await api.get('/api/innerad/random')
            console.log(response)
            setAds(response.data.ads)
        }
        getAds()
    }, [])

    for(let i = 0; i < 10; i++) {
        getAds()
    }

    return (
        <div style={{width}}>
            {ads.map(item => <Card item={item} />)}
        </div>
    )
}

export default ShowAd