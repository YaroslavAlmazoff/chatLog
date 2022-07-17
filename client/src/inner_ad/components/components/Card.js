import '../../styles/card.css'
import { Link } from 'react-router-dom'

const Card = ({item}) => {
    return (
        <div className="inner-ad-item">
            <Link style={{textDecoration: 'none'}} to={item.link}>
                <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
                <p className='inner-ad-item-title'>{item.title}</p>
            </Link>
        </div>
    )
}

export default Card