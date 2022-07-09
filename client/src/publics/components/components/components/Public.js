import api from '../../../../auth/api/auth'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

const Public = ({item}) => {
    const auth = useContext(AuthContext)

    const subscribe = async () => {
        const response = await api.get(`/api/public/subscribe/${item._id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        console.log(response)
    }

    return (
        <div className="public-item">
            <div className="public-item-info">
                <img className="public-item-avatar" src={process.env.REACT_APP_API_URL + `/publicavatars/` + item.avatarUrl} alt="public avatar" />
                <p className="public-item-name">{item.name}</p>
            </div>
            <button onClick={subscribe} className="public-item-subscribe">Подписаться</button>
        </div>
    )
}

export default Public