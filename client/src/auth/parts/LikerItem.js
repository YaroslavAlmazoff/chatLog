import useRandom from "../../common_hooks/random.hook"
import useFiles from '../../common_hooks/files.hook'
import { useState, useEffect } from 'react'

const LikerItem = ({el}) => {
    const {randomKey} = useRandom()
    const gotoLiker = (e, id) => {
        e.stopPropagation()
        window.location = `/user/${id}`
    }

    return (
        <div>
            <img key={randomKey()} onClick={(e) => gotoLiker(e, el._id)} title={`${el.name} ${el.surname}`} className='liker' src={process.env.REACT_APP_API_URL + '/useravatars/' + el.avatarUrl} alt="avatar" />
        </div>
    )
}

export default LikerItem