import '../../styles/card.css'

const CabinetCard = ({item, selectedAd, setSelectedAd, setStatsDisplay}) => {
    const select = () => {
        setSelectedAd(item)
        setStatsDisplay('block')
    }
    return (
        <div className="inner-ad-item-inline" onClick={select} style={selectedAd._id !== item._id ? {backgroundColor: 'rgb(41, 41, 41)'} : {backgroundColor: 'rgb(82, 82, 82)'}}>
            <img src={process.env.REACT_APP_API_URL + `/inneradimages/${item.imageUrl}`} alt="inner-ad-item-img" className='inner-ad-item-img' />
            <p className='inner-ad-item-title'>{item.title}</p>
        </div>
    )
}

export default CabinetCard