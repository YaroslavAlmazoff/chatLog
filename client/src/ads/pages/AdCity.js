import { useContext, useEffect, useState } from "react"
import api from '../../auth/api/auth'
import { AuthContext } from "../../context/AuthContext"
import AdItem from "../components/AdItem"
import '../styles/main.css'

const AdCity = () => {
    const auth = useContext(AuthContext)
    const [ads, setAds] = useState([])

    useEffect(() => {
        if(!auth.userId) return 
        const getAds = async () => {
            const response = await api.get(`/api/ad/city/${auth.userId}`)
            console.log(response)
            setAds(response.data.ads)
        }
        getAds()
    }, [auth.userId])

    return (
        <div className="ads-new">
            <div className="ads-new-content">
                <p className="ads-new-title">Объявления в вашем городе</p>
                {ads.map(item => <AdItem item={item} width={'20%'} />)}
            </div>
        </div>
    )
}

export default AdCity