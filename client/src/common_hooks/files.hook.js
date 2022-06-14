import api from '../auth/api/auth'

const useFiles = () => {
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
    const getFile = async (file) => {
        const response = await api.get(`/api/files/file/${file.owner}/${file.name}`)
        return response.data.file
    }
    const getFileIcon = async (name) => {
        const response = await api.get(`/api/files/icon/${name}`)
        return response.data.file
    }


    return {getFoto, getPost, getVideo, getAvatar, getBanner, getMessageFoto, getFile, getFileIcon}
}

export default useFiles