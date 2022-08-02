import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import api from '../../../auth/api/auth'

const MyChannel = () => {
    const auth = useContext(AuthContext)

    const [myChannel, setMyChannel] = useState({
        name: '',
        avatarUrl: ''
    })
    const [myChannelDisplay, setMyChannelDisplay] = useState('')

    useEffect(() => {
        if(!auth.userId) return
        const getChannel = async () => {
            const response = await api.get(`/api/videohost/channels/channelbyadmin/${auth.userId}`)
            if(response.data.channel) {
                setMyChannel(response.data.channel)
                setMyChannelDisplay('block')
            } else {
                setMyChannelDisplay('none')
            }
        } 
        getChannel()
    }, [auth])

    return (
        <div className="videohost-my-channel" style={{display: myChannelDisplay}}>
            {myChannel.avatarUrl && <img src={process.env.REACT_APP_API_URL + '/channelavatars/' + myChannel.avatarUrl} className="videohost-my-channel-avatar" alt="" />}
            <p className="videohost-my-channel-title">{myChannel.name}</p>
        </div>
    )
}

export default MyChannel