import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Public from "../components/components/Public"
import '../../styles/publics.css'

const PublicsPage = () => {
    const [publics, setPublics] = useState([])

    useEffect(() => {
        const getPublics = async () => {
            const response = await api.get('/api/public/all')
            setPublics(response.data.publics)
        }
        getPublics()
    }, [])

    const createPublic = () => {
        window.location = '/createpublic'
    }


    return (
        <div className="publics">
            <button onClick={createPublic} className="publics-create-public">Создать группу</button>
            {publics.map(item => <Public item={item} />)}
        </div>
    )
}

export default PublicsPage