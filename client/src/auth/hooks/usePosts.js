import { useNavigate } from "react-router"
import api from "../api/auth"
import {AuthContext} from '../../context/AuthContext'
import { useContext } from "react"

const usePosts = () => {
    const auth = useContext(AuthContext)
    const navigate = useNavigate()
    const send = async (getCurrentDate, articleTitle, file, params, setArticleTitle, setUserPosts, userPosts, userVideos, setUserVideos, setUploading) => {
        setUploading(true)
        const currentDate = getCurrentDate()
        let formData = new FormData()
        formData.append('title', articleTitle)
        formData.append('date', currentDate)
        formData.append('likes', 0)
        formData.append('comments', 0)
        console.log(file)
        formData.append('file', file)
        console.log(formData)
        if(!file) {
            const response = await api.post(`/api/createuserpost`, formData, {headers: 
                {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${auth.token}`}
            })
            setArticleTitle('Введите название статьи')
            setUserPosts([...userPosts, {title: articleTitle, date: currentDate, likes: 0, comments: 0, imageUrl: response.data.filename}])
            navigate(`/user/${auth.userId}`)
        }
        else if(file.type !== 'image/jpeg') {
            const response = await api.post(`/api/uploaduservideo`, formData, {headers: 
                {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${auth.token}`}
            })
            setUserVideos([...userVideos, {title: articleTitle, date: currentDate, likes: 0, comments: 0, imageUrl: response.data.filename}])
            navigate(`/user/${auth.userId}`)
        } else {
            const response = await api.post(`/api/createuserpost`, formData, {headers: 
                {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${auth.token}`}
            })
            await api.post(`/api/createuserfoto`, formData, {headers: 
                {'Content-Type': 'multipart/form-data', Authorization: `Bearer ${auth.token}`}
            })
            setArticleTitle('Введите название статьи')
            setUserPosts([...userPosts, {title: articleTitle, date: currentDate, likes: 0, comments: 0, imageUrl: response.data.filename}])
            navigate(`/user/${auth.userId}`)
        }
        
    }
    const sendFoto = async (file2, getCurrentDate, params, userFotos, setUserFotos) => {
        const currentDate = getCurrentDate()
        let formData2 = new FormData()
        formData2.append('file', file2)
        formData2.append('date', currentDate)
        formData2.append('likes', 0)
        formData2.append('comments', 0)
        const response = await api.post(`/api/createuserfoto`, formData2, {headers: 
            {'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${auth.token}`
        }
        })
        setUserFotos([...userFotos, {imageUrl: response.data.filename}])
        window.location.reload()
    }
    const deleteFoto = async (url) => {
        await api.delete(`/api/deleteuserfoto/${url}`)
        navigate(`/user/${auth.userId}`)
    }
    const deletePost = async (e, post, setUserPosts, userPosts) => {
        e.stopPropagation()
        setUserPosts([...userPosts].filter(el => el._id !== post))
        console.log(post)
        const response = await api.delete(`/api/deleteuserpost/${post}`)
        console.log(response)
    }
    const deleteVideo = async (e, id, setUserVideos, userVideos) => {
        e.stopPropagation()
        console.log(id, userVideos)
        setUserVideos([...userVideos].filter(el => el._id !== id))
        await api.delete(`/api/video/${id}`)
    }
    return {send, sendFoto, deleteFoto, deletePost, deleteVideo}
}

export default usePosts


