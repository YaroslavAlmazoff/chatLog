import './services.css'

const Service = ({item}) => {
    return (
        <div className="service">
            <img className="service-img" src={require(`./img/services-icons/${item.imageUrl}`)} alt="" />
            <p className="service-title">{item.title}</p>
        </div>
    )
}

export default Service