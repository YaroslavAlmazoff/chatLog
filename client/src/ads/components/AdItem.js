import '../styles/ad-item.css'

const AdItem = ({item}) => {
    return (
        <div className="ad-item">
            <img className="ad-item-image" src={process.env.REACT_APP_API_URL + '/ads/' + item.images[0]} alt="ad" />
            <div className="ad-item-info">
                <p className="ad-item-title">{item.title}</p>
                <p style={{color: 'white'}}>Стоимость: </p><p className="ad-item-price">{item.price}&#8381;</p>
                <p style={{color: 'white'}}>Город: </p><p className="ad-item-city">{item.city}</p>
                <p className="ad-item-date">{item.date}</p>
            </div>
        </div>
    )
}

export default AdItem