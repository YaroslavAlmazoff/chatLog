import { useEffect, useState, useMemo } from "react"
import VideoItem from '../../components/components/VideoItem'
import api from '../../../../auth/api/auth'
import {useParams} from 'react-router'
import Search from "../../components/components/components/components/Search"
import '../../../styles/list.css'

const Same = () => {
    const [videos, setVideos] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const params = useParams()

    useEffect(() => {
        const getVideos = async () => {
            const response = await api.post('/api/videohost/videos/same', {category: params.category})
            setVideos(response.data.videos)
        }
        getVideos()
    }, [params])

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

export default Same