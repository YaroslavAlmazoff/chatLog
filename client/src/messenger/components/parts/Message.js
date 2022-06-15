import useRandom from "../../../common_hooks/random.hook"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"

const Message = ({mess}) => {
    const {getAvatar} = useFiles()
    const [avatarCode, setAvatarCode] = useState('')
    useEffect(() => {
        getAvatar(mess.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        })
    }, [mess])

    const {getMessageFoto} = useFiles()
    const [imageCode, setImageCode] = useState('')
    useEffect(() => {
        console.log(mess.imageUrl)
        getMessageFoto(mess.imageUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setImageCode(result)
        })
    }, [mess])
    const auth = useContext(AuthContext)
    const {randomKey} = useRandom()
    return (
        <div key={randomKey()} className={mess.user === auth.userId ? 'my-message-wrapper': 'message-wrapper'}>
                    <div className={mess.user === auth.userId ? 'my-message': 'message'} key={Date.now() - Math.random() * 999}>
                                    <img className="message-avatar" src={avatarCode} alt="avatar" />
                                    <p>&nbsp;&nbsp;{mess.name}&nbsp;&nbsp;&nbsp;</p> <p className="message-date">{mess.date}</p>
                            </div>
                            <div className="message-text">
                                <p>{mess.message}</p>
                            </div>   
                            {mess.imageUrl 
                            ? <img className="message-image" src={imageCode} alt="userimage" />
                            : <></>} 
                    </div>
    )
}

export default Message