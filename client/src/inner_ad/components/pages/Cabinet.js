import { useEffect, useState, useContext } from 'react'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'
import '../../styles/cabinet.css'
import CabinetCard from '../components/CabinetCard'

const Cabinet = () => {
    const auth = useContext(AuthContext)
    const [ads, setAds] = useState([])
    const [statsDisplay, setStatsDisplay] = useState('none')
    const [selectedAd, setSelectedAd] = useState({})

    useEffect(() => {
        const getAds = async () => {
            if(!auth.userId) return
            const response = await api.get(`/api/innerad/userads/${auth.userId}`)
            setAds(response.data.ads)
        }
        getAds()
    }, [auth])

    const createAd = () => {
        window.location = '/innerad/create'
    }

    const gotoAd = () => {
        window.location = `/innerad/${selectedAd._id}`
    }

    return (
        <div className='innerad-cabinet'>
            <div className='innerad-cabinet-top'>
                <p className='innerad-cabinet-title'>Личный кабинет</p>
                <button onClick={createAd} className='innerad-cabinet-button'>+ Разместить рекламу</button>
            </div>
            <div className='innerad-cabinet-stats' style={{display: statsDisplay}}>
                <p className='innerad-cabinet-stat' style={selectedAd.views > 0 ? {color: 'lightgreen'}: {color: 'red'}}>Просмотры: {selectedAd.views}</p>
                <p className='innerad-cabinet-stat' style={selectedAd.views > 0 ? {color: 'lightgreen'}: {color: 'red'}}>Клики: {selectedAd.views}</p>
                <button onclick={gotoAd} className='innerad-cabinet-button'>Перейти к рекламе</button>
            </div>
            <div className='innerad-cabinet-cards'>
                {ads.map(item => <CabinetCard item={item} selectedAd={selectedAd} setSelectedAd={setSelectedAd} setStatsDisplay={setStatsDisplay} />)}
            </div>
        </div>
    )
}

export default Cabinet