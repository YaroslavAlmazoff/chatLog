import { useEffect, useState } from "react"
import Service from "./Service"
import './services.css'

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        setServices([
            {title: 'Мессенджер', imageUrl: 'messenger.png', link: '/messages'},
            {title: 'Объявления', imageUrl: 'ads.png', link: '/ads'},
            {title: 'Облако', imageUrl: 'cloud.png', link: '/cloud'},
            {title: 'Фотограф', imageUrl: 'photographer.png', link: '/photos/new'},
        ])
    }, [])

    return (
        <div className="services">
            <div className="services-list">
                {services.map(item => <Service item={item} />)}
            </div>
        </div>
    )
}

export default Services