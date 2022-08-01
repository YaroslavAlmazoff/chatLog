import { useContext, useEffect, useState, useMemo } from "react"
import VideoItem from '../../components/components/VideoItem'
import api from '../../../../auth/api/auth'
import {AuthContext} from '../../../../context/AuthContext'
import '../../../styles/list.css'
import Search from "../../components/components/components/components/Search"

const Recommended = () => {
    const auth = useContext(AuthContext)
    const [videos, setVideos] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.get(`/api/videohost/videos/recommended/${auth.userId}`)
            setVideos(response.data.videos)
        }
        getVideos()
    }, [auth])

    const searchedVideos = useMemo(() => {
        return [...videos].filter(el => {
            return el.title.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.description.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchValue === ''
        })
    }, [videos, searchValue])

    return (
        <div className="videohost-list-page">
            <Search searchValue={searchValue} setSearchValue={setSearchValue} />
            {
                searchedVideos.map(item => <VideoItem item={item} />)
            }
        </div>
    )
}

export default Recommended