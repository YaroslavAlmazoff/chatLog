import './services.css'

const Service = ({item}) => {
    const gotoService = () => {
        window.location = item.link
    }
    return (
        <div onClick={gotoService} className="service">
            <img className="service-img" src={require(`./img/services-icons/${item.imageUrl}`)} alt="" />
            <p className="service-title">{item.title}</p>
        </div>
    )
}

export default Service