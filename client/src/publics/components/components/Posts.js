import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Post from "./components/Post"
import '../../styles/posts.css'
import { useParams } from "react-router"

const Fotos = ({pub}) => {
    const params = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getFotos = async () => {
            const response = await api.get(`/api/public/posts/${params.id}`)
            setPosts(response.data.fotos)
        }
        getFotos()
    }, [pub])

    return (
        <div className="public-posts">
            {posts.map(item => <Post item={item} />)}
        </div>
    )
}

export default Fotos