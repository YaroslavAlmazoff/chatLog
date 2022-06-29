import useRandom from "../../../common_hooks/random.hook"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"

const Message = ({mess}) => {
    const gotoFile = (link) => {
        console.log(link)
        window.location = link
    }
    const auth = useContext(AuthContext)
    const {randomKey} = useRandom()
    return (
        <div key={randomKey()} className={mess.user === auth.userId ? 'my-message-wrapper': 'message-wrapper'}>
                    <div className={mess.user === auth.userId ? 'my-message': 'message'} key={Date.now() - Math.random() * 999}>
                                    <img className="message-avatar" src={process.env.REACT_APP_API_URL + `/useravatars/` + mess.avatarUrl} alt="avatar" />
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
                            ? <img className="message-image" src={process.env.REACT_APP_API_URL + `/messagefotos/` + mess.imageUrl} alt="userimage" />
                            : <></>} 
                            {mess.videoUrl 
                            ? <video width="300" controls src={process.env.REACT_APP_API_URL + `/messagevideos/` + mess.videoUrl}>
                            </video> 
                            : <></>} 
                    </div>
    )
}

export default Message