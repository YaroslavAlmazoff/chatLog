import { Link } from 'react-router-dom'
import '../../styles/card.css'

const Card = ({item}) => {
    return (
        <div className="inner-ad-item">
            {item.link ? <a className='sd-none' href={item.link}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </a> :
            <Link className='sd-none' to={`/innerad/${item.id}`}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </Link>
            }
        </div>
    )
}

export default Card