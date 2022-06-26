import useRandom from "../../../common_hooks/random.hook"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"

const Message = ({mess}) => {
    const {getAvatar, getMessageVideo, getMessageFoto} = useFiles()
    const [avatarCode, setAvatarCode] = useState('')
    useEffect(() => {
        getAvatar(mess.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        })
    }, [mess])

    const [imageCode, setImageCode] = useState('')
    const [videoCode, setVideoCode] = useState('')
    useEffect(() => {
        console.log(mess.imageUrl)
        getMessageFoto(mess.imageUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setImageCode(result)
        })
    }, [mess])
    useEffect(() => {
        console.log(mess.videoUrl)
        getMessageFoto(mess.videoUrl).then((data) => {
            const result = 'data:video/mp4;base64,' + data
            setVideoCode(result)
        })
    }, [mess])
    const gotoFile = (link) => {
        console.log(link)
        window.location = link
    }
    const auth = useContext(AuthContext)
    const {randomKey} = useRandom()
    return (
        <div key={randomKey()} className={mess.user === auth.userId ? 'my-message-wrapper': 'message-wrapper'}>
                    <div className={mess.user === auth.userId ? 'my-message': 'message'} key={Date.now() - Math.random() * 999}>
                                    <img className="message-avatar" src={avatarCode} alt="avatar" />
                                    <p>&nbsp;&nbsp;{mess.name}&nbsp;&nbsp;&nbsp;</p> <p className="message-date">{mess.date}</p>
                            </div>
                            <div className="message-text">
                                {
                                mess.isFile 
                                ? <p className="message-file-link" onClick={(e) => gotoFile(mess.message)}>Файл {mess.message}</p>
                                : 
                                <p>{mess.message}</p>
                                }
                            </div>
                            
                            {mess.imageUrl 
                            ? <img className="message-image" src={imageCode} alt="userimage" />
                            : <></>} 
                            {mess.videoUrl 
                            ? <video width="300"controls src={videoCode}>
                            </video> 
                            : <></>} 
                    </div>
    )
}

export default Message