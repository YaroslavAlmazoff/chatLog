import '../styles/ad-item.css'

const AdItem = ({item, width}) => {

    const gotoAd = () => {
        window.location = `/ad/${item._id}`
    }

    return (
        <div onClick={gotoAd} className="ad-item" style={{width}}>
            <img className="ad-item-image" src={process.env.REACT_APP_API_URL + '/ads/' + item.images[0]} alt="ad" />
            <div className="ad-item-info">
                <p className="ad-item-title" style={item.title.length <= 13 ? {fontSize: '16pt'} : {fontSize: '12pt'}}>{item.title}</p>
                <p className='ad-item-price'><span style={{color: 'white'}}>Стоимость: </span><span>{item.price}&#8381;</span></p>
                <p className="ad-item-city"><span style={{color: 'white'}}>Город: </span><span>{item.city}</span></p>
                <p className="ad-item-date">{item.date}</p>
            </div>
        </div>
    )
}

export default AdItem