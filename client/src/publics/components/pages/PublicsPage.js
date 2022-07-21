import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Public from "../components/components/Public"
import '../../styles/publics.css'
import ShowAdLeft from "../../../inner_ad/components/components/ShowAdLeft"
import ShowAdRight from "../../../inner_ad/components/components/ShowAdRight"
import UsersSearchSide from "../components/UsersSearchSide"
import { useMemo } from "react"

const PublicsPage = () => {
    const [publics, setPublics] = useState([])
    const [searchValue, setSearchValue] = useState('')

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

    const searchedPublics = useMemo(() => {
        return [...publics].filter(el => {
            return el.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue === ''
        })
    }, [publics, searchValue])

    return (
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <div className="users-ads">
                <UsersSearchSide searchValue={searchValue} setSearchValue={setSearchValue} />  
                <ShowAdLeft width={'28%'} />
            </div>
            <div className="publics">
                <button onClick={createPublic} className="publics-create-public">Создать группу</button>
                {searchedPublics.map(item => <Public item={item} />)}
            </div>
            <ShowAdRight width={'28%'} />
        </div>    
    )
}

export default PublicsPage