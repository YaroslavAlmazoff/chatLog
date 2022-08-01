import { useContext, useEffect, useState, useMemo } from "react"
import ChannelItem from '../../components/components/ChannelItem'
import api from '../../../../auth/api/auth'
import {AuthContext} from '../../../../context/AuthContext'
import '../../../styles/list.css'
import Search from "../../components/components/components/components/Search"

const Recommended = () => {
    const auth = useContext(AuthContext)
    const [channels, setChannels] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const getChannels = async () => {
            const response = await api.get(`/api/videohost/channels/recommended/${auth.userId}`)
            setChannels(response.data.channels)
        }
        getChannels()
    }, [auth])

    const searchedChannels = useMemo(() => {
        return [...channels].filter(el => {
            return el.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue === ''
        })
    }, [channels, searchValue])

    return (
        <div className="videohost-list-page">
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            {
                searchedChannels.map(item => <ChannelItem item={item} />)
            }
        </div>
    )
}

export default Recommended