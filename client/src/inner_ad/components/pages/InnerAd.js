import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '../../../auth/api/auth'
import '../../styles/inner-ad.css'

const InnerAd = () => {
    const params = useParams()
    const [ad, setAd] = useState({imageUrl: '', title: '', text: 'text'})

    useEffect(() => {
        const getAd = async () => {
            const response = await api.get(`/api/innerad/ad/${params.id}`)
            console.log(response)  
            setAd(response.data.ad)
        }
        getAd()
    }, [params])


    return (
        <div className="inner-ad">
            <img className='inner-ad-img' src={process.env.REACT_APP_API_URL + `/inneradimages/${ad.imageUrl}`} alt="ad" />  
            <div className='inner-ad-info'>
                <p className='inner-ad-title'>{ad.title}</p>
                <p className='inner-ad-text'>{ad.text}</p>
            </div>
        </div>
    )
}

export default InnerAd