import { useEffect, useState } from "react"
import Service from "./Service"
import './services.css'

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        setServices([
            {title: 'Мессенджер', imageUrl: 'messenger.png'},
            {title: 'Объявления', imageUrl: 'ads.png'},
            {title: 'Облако', imageUrl: 'cloud.png'},
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