import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Public from "../components/components/Public"
import '../../styles/publics.css'
import ShowAdLeft from "../../../inner_ad/components/components/ShowAdLeft"
import ShowAdRight from "../../../inner_ad/components/components/ShowAdRight"

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
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <ShowAdLeft width={'28%'} />
            <div className="publics">
                <button onClick={createPublic} className="publics-create-public">Создать группу</button>
                {publics.map(item => <Public item={item} />)}
            </div>
            <ShowAdRight width={'28%'} />
        </div>    
    )
}

export default PublicsPage