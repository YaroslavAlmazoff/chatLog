import { useEffect, useRef } from 'react'
import api from '../../../auth/api/auth'
import '../../styles/card.css'

const Card = ({item}) => {
    const linkRef = useRef(null)
    useEffect(() => {
        const view = async () => {
            const response = await api.get(`/api/innerad/view/${item._id}`)
            console.log(response)
        }
        view()
    }, [item])

    const gotoAd = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const response = await api.get(`/api/innerad/click/${item._id}`)
        console.log(response)
        linkRef.current.click()
    }

    return (
        <div className="inner-ad-item" onClick={e => gotoAd(e)}>
            {item.link ? <a ref={linkRef} className='sd-none' href={item.link}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </a> :
            <a ref={linkRef} className='sd-none' href={`/innerad/${item.id}`}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </a>
            }
        </div>
    )
}

export default Card