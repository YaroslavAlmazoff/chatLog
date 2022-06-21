import { useEffect, useState } from "react"
import Service from "./Service"
import './services.css'

const Services = () => {
    const [services, setServices] = useState([])

    useEffect(() => {
        setServices([
            {title: 'Messenger', imageUrl: 'messenger.png'},
            {title: 'Chat Log Cloud', imageUrl: 'cloud.png'},
            {title: 'Chat Log Ads', imageUrl: 'ads.png'},
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