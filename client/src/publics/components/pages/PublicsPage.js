import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Public from "../components/components/Public"

const PublicsPage = () => {
    const [publics, setPublics] = useState([])

    useEffect(() => {
        const getPublics = async () => {
            const response = await api.get('/api/public/all')
            setPublics(response.data.publics)
        }
        getPublics()
    }, [])


    return (
        <div className="publics-page">
            {publics.map(item => <Public item={item} />)}
        </div>
    )
}

export default PublicsPage