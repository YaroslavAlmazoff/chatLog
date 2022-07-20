import { useEffect, useRef } from 'react'
import api from '../../../auth/api/auth'
import '../../styles/card.css'

const Card = ({item}) => {
    const itemRef = useRef(null)
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
        if(item.link) {
            window.location = item.link
        } else {
            window.location = `/innerad/${item._id}`
        }
    }

    return (
        <div className="inner-ad-item" onClick={e => gotoAd(e)} style={window.innerWidth >= 500 ? {display: 'block'} : {display: 'none'}}>
            {item.link ? <a ref={linkRef} className='sd-none' href={item.link}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </a> :
            <a ref={linkRef} className='sd-none' href={`/innerad/${item._id}`}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </a>
            }
        </div>
    )
}

export default Card