import {useEffect, useState} from 'react'
import Subscriber from './components/Subscriber'
import api from '../../../auth/api/auth'
import '../../styles/subscribers.css'
import { useParams } from "react-router"

const Subscribers = ({pub}) => {
    const params = useParams()
    const [subscribers, setSubscribers] = useState([])

    useEffect(() => {
        const getSubscribers = async () => {
            const response = await api.get(`/api/public/firstsubscribers/${params.id}`)
            setSubscribers(response.data.subscribers)
        }
        getSubscribers()
    }, [pub])

    return (
        <div className="subscribers">
            {subscribers.map(item => <Subscriber item={item} />)}
        </div>
    )
}

export default Subscribers