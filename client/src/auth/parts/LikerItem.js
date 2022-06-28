import useRandom from "../../common_hooks/random.hook"
import useFiles from '../../common_hooks/files.hook'
import { useState, useEffect } from 'react'

const LikerItem = ({el}) => {
    const {randomKey} = useRandom()
    const gotoLiker = (e, id) => {
        e.stopPropagation()
        window.location = `/user/${id}`
    }
    const {getAvatar} = useFiles()

    const [avatarCode, setAvatarCode] = useState('')

    useEffect(() => {
        getAvatar(el.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        }) 
    }, [])
    return (
        <div>
            <img key={randomKey()} onClick={(e) => gotoLiker(e, el._id)} title={`${el.name} ${el.surname}`} className='liker' src={avatarCode} alt="avatar" />
        </div>
    )
}

export default LikerItem