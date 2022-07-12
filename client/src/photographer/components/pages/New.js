import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import PhotoCard from "../components/PhotoCard"
import useDate from "../../../common_hooks/date.hook"
import '../../styles/photo-list.css'
import { Link } from "react-router-dom"

const New = () => {
    const {getCurrentDate} = useDate()
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const getPhotos = async () => {
            const date = getCurrentDate()
            console.log(date)
            const response = await api.post('/api/photo/new', {date})
            setPhotos(response.data.photos)
        }
        getPhotos()
    }, [])

    return (
        <div className="photo-page-wrapper">
            <p className="photo-page-title">ChatLog <span style={{color: 'rgb(0, 140, 255)'}}>Photographer</span> <Link className="photos-link" to="/photo/create">Опубликовать фотографию</Link> / Новые фотографии <Link className="photos-link" to="/photos/popular">Популярные фотографиии</Link></p>
            <div className="photos">
                {photos.map(item => <PhotoCard item={item} />)}
            </div>
        </div>
    )
}

export default New