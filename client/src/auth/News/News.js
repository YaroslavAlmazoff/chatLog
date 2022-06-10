import { useState, useEffect, useContext } from "react"
import NewsPost from "./NewsPost"
import NewsVideo from "./NewsVideo"
import { AuthContext } from "../../context/AuthContext"
import api from '../api/auth'

const News = () => {
    const [newsPosts, setNewsPosts] = useState([])
    const [newsVideos, setNewsVideos] = useState([])
    const auth = useContext(AuthContext)
    useEffect(() => {
        const getNews = async () => {
            const response = await api.get(`/api/news`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            console.log(response)

            const posts = await response.data.news.map(async el => {
                console.log(el)
                const response = await api.get(`/api/post/${el}`)
                console.log(response.data.article)
                return response.data.article
            })
            console.log(posts)
            /*response.data.news.videos.forEach(async el => {
                const video = api.get(`/api/video/${el}`)
                videos.push(video)
            });
            setNewsVideos(videos)*/
            setNewsPosts(posts)
            console.log(newsPosts)
            
        }
        getNews()
    }, [auth])
    return(
        <div>
            <h2>Новые видео&#128293;</h2>
            {newsVideos.map(el => <NewsVideo title={el.title} date={el.date} imageUrl={el.imageUrl} likes={el.likes} comments={el.comments} />)}
            <h2>Новые записи&#128293;</h2>
            {newsPosts.map(el => <NewsPost key={Date.now() - Math.random()*1000} title={el.title} date={el.date} imageUrl={el.imageUrl} likes={el.likes} comments={el.comments} id={el._id} />)}
        </div>
    )
}

export default News