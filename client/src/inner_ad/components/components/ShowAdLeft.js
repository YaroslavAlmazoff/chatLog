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
                function compare( a, b ) {
                    if ( a.title < b.title ){
                      return -1;
                    }
                    if ( a.title > b.title ){
                      return 1;
                    }
                    return 0;
                }
                const newads = ads.sort(compare)
                setAds(newads)
            },10000)
        }
        getAds()
    }, [])

    return (
        <div style={{width}}>
            {ads.map(item => <Card item={item} />)}
        </div>
    )
}

export default ShowAd