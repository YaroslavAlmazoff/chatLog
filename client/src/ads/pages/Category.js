import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from '../../auth/api/auth'
import AdItem from "../components/AdItem"

const Category = () => {
    const params = useParams()
    const [ads, setAds] = useState([])

    useEffect(() => {
        const getAds = async () => {
            const response = await api.post('/api/ad/category', {category: params.category})
            setAds(response.data.ads)
        }
        getAds()
    }, [params])

    return (
        <div className="ads-category">
            <div className="ads-category-content">
                {ads.map(item => <AdItem item={item} />)}
            </div>
        </div>
    )
}

export default Category