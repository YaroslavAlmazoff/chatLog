import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import PhotoCard from "../components/PhotoCard"
import '../../styles/photo-list.css'
import { Link } from "react-router-dom"

const Popular = () => {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const getPhotos = async () => {
            const response = await api.get('/api/photo/popular')
            setPhotos(response.data.photos)
        }
        getPhotos()
    }, [])

    return (
        <div className="photo-page-wrapper">
            <p className="photo-page-title">ChatLog Photographer / Популярные фотографии <Link className="photos-link" to="/photos/new">Новые фотографии</Link></p>
            <div className="photos">
                {photos.map(item => <PhotoCard item={item} />)}
            </div>
        </div>
    )
}

export default Popular