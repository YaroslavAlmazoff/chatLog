import { useContext } from 'react'
import api from '../auth/api/auth'
import { AuthContext } from '../context/AuthContext'

const useReactions = () => {
    const auth = useContext(AuthContext)
    console.log(auth.token)
    //Кастомный хук для увеличения количества лайков и комментариев
    const reaction = async (n, id, isFoto, fotoUrl) => {
        if(!isFoto) {
            if(n === 0) {
                //Like
                const response = await api.post(`/api/like`, {id}, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            } else if(n === -1) {
                //Dislike
                const response = await api.post(`/api/like`, {sub: true, id}, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            } else {
                //Comment
                const response = await api.post('/api/comm', {id}, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            }
        } else {
            if(n === 0) {
                //Like
                const response = await api.post(`/api/likefoto/${fotoUrl}`, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            } else if(n === -1) {
                //Dislike
                const response = await api.post(`/api/likefoto/${fotoUrl}`, {sub: true}, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            } else {
                //Comment
                const response = await api.get(`/api/fotocomm/${fotoUrl}`, {headers: 
                    {Authorization: `Bearer ${auth.token}`}
                })
                return response
            }
        }
    }
    return reaction
}

export default useReactions