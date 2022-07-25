import { useEffect, useState, useMemo } from "react"
import api from '../../auth/api/auth'
import AdItem from "../components/AdItem"
import '../styles/main.css'

const Search = () => {
    const [ads, setAds] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const getAds = async () => {
            const response = await api.get('/api/ad/all')
            setAds(response.data.ads.reverse())
        }
        getAds()
    }, [])

    const searchedAds = useMemo(() => {
        return [...ads].filter(el => {
            return el.category.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.title.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.description.toLowerCase().includes(searchValue.toLowerCase()) || 
            searchValue === ''
        })
    }, [ads, searchValue])

    return (
        <div className="ads-category">
            <div className="ads-new-content">
                <input className="ads-main-input" value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Поиск по объяалениям..." />
                {searchedAds.map(item => <AdItem item={item} width={'20%'} />)}
            </div>
        </div>
    )
}

export default Search