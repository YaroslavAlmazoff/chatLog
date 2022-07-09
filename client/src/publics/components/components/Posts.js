import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Post from "./components/Post"
import '../../../styles/posts.css'

const Fotos = ({pub}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getFotos = async () => {
            const response = await api.get(`/api/public/posts/${pub._id}`)
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