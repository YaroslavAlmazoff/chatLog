import { useContext } from 'react'
import '../../../styles/channel-item.css'
import api from '../../../../auth/api/auth'
import { AuthContext } from '../../../../context/AuthContext'

const ChannelItem = (item) => {
    const auth = useContext(AuthContext)

    const subscribe = async () => {
        const response = await api.get(`/api/videohost/useractions/subscribe/${auth.userId}`)
        console.log(response)
    }

    return (
        <div className="videohost-channel-item">
            <img className="videohost-channel-item-preview" src={process.env.REACR_APP_API_URL + '/channelavatars/' + item.avatarUrl} alt="" />
            <p className='videohost-channel-item-title'>{item.name}</p>
            <p className='videohost-channel-item-subscribers'>{item.subscribers.length} подписчиков</p>
            <button className='videohost-channel-item-button' onClick={subscribe}></button>
        </div>
    )
}

export default ChannelItem