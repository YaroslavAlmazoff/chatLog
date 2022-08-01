import { useEffect, useState, useMemo } from "react"
import VideoItem from '../../components/components/VideoItem'
import api from '../../../../auth/api/auth'
import useDate from '../../../../common_hooks/date.hook'
import Search from "../../components/components/components/components/Search"
import '../../../styles/list.css'

const NewVideos = () => {
    const [videos, setVideos] = useState([])
    const {getCurrentDate} = useDate()
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const getVideos = async () => {
            const date = getCurrentDate()
            const response = await api.get(`/api/videohost/videos/new/${date}`)
            setVideos(response.data.videos)
        }
        getVideos()
    }, [])

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

export default NewVideos