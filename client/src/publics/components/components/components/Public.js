import api from '../../../../auth/api/auth'
import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'
import '../../../styles/public-item.css'

const Public = ({item}) => {
    const auth = useContext(AuthContext)

    const subscribe = async () => {
        const response = await api.get(`/api/public/subscribe/${item._id}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        console.log(response)
    }
    const gotoPublic = () => {
        window.location = `/public/${item._id}`
    }

    return (
        <div className="public-item" onClick={gotoPublic}>
            <div className="public-item-info">
                {item.avatarUrl 
                ? <img className="public-item-avatar" src={process.env.REACT_APP_API_URL + `/publicavatars/` + item.avatarUrl} alt="public avatar" />
                : <img className="public-item-avatar" src={require('../../../img/group.png')} alt="group" />
                }
                
                <p className="public-item-name">{item.name}</p>
            </div>
            <button onClick={subscribe} className="public-item-subscribe">Подписаться</button>
        </div>
    )
}

export default Public