import {useState, useEffect} from 'react'
import api from '../../../auth/api/auth'
import {useParams} from 'react-router'
import Head from '../components/Head'
import Subscribers from '../components/Subscribers'
import Fotos from '../components/Fotos'
import Posts from '../components/Posts'
import '../../styles/public.css'

const PublicPage = () => {
    const params = useParams()
    const [pub, setPub] = useState({})

    const isAdmin = true

    useEffect(() => {
        const getPublic = async () => {
            console.log(params.id)
            const response = await api.get(`/api/public/public/${params.id}`)
            setPub(response.data.pub)
        }
        getPublic()
    }, [params])

    return (
        <div className="public">
            <Head pub={pub} isAdmin={isAdmin} />
            <Subscribers pub={pub} />
            <Fotos pub={pub} />
            <Posts pub={pub} />
        </div>
    )
}

export default PublicPage