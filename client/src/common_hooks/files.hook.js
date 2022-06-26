import api from '../auth/api/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const useFiles = () => {
    const auth = useContext(AuthContext)
    const getFoto = async (imageUrl) => {
        const response = await api.get(`/api/files/foto/${imageUrl}`)
        return response.data.file
    }
    const getPost = async (imageUrl) => {
        const response = await api.get(`/api/files/post/${imageUrl}`)
        return response.data.file
    }
    const getVideo = async (imageUrl) => {
        const response = await api.get(`/api/files/video/${imageUrl}`)
        return response.data.file
    }
    const getAvatar = async (imageUrl) => {
        const response = await api.get(`/api/files/avatar/${imageUrl}`)
        return response.data.file
    }
    const getBanner = async (imageUrl) => {
        const response = await api.get(`/api/files/banner/${imageUrl}`)
        return response.data.file
    }
    const getMessageFoto = async (imageUrl) => {
        const response = await api.get(`/api/files/messagefoto/${imageUrl}`)
        return response.data.file
    }
    const getMessageVideo = async (imageUrl) => {
        const response = await api.get(`/api/files/messagevideo/${imageUrl}`)
        return response.data.file
    }
    const getFile = async (file) => {
        const response = await api.get(`/api/files/file/${file.owner}/${file.name}`)
        return response.data.file
    }
    const getFileIcon = async (name) => {
        const response = await api.get(`/api/files/icon/${name}`)
        return response.data.file
    }
    const getFileToDownload = async (file) => {
        console.log(file)
        const response = await api.get(`/api/cloud/filetodownload/${file.name}`, {headers : {
            Authorization: `Bearer ${auth.token}`
        }})
        return response.data.file
    }


    return {getFoto, getPost, getVideo, getAvatar, getBanner, getMessageFoto, getMessageVideo, getFile, getFileIcon, getFileToDownload}
}

export default useFiles