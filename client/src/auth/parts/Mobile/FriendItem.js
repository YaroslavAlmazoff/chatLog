import useRandom from "../../../common_hooks/random.hook"
import useWord from "../../../common_hooks/divideWord.hook"
import useFiles from "../../../common_hooks/files.hook"
import api from "../../api/auth"
import { AuthContext } from "../../../context/AuthContext"
import { useContext, useEffect, useState } from "react"

const FriendItem = ({el, isOwner, setUserFriends, userFriends, setNoticeDisplay, setNoticeText, noticeRef}) => {
    const {getAvatar} = useFiles()
    const [avatarCode, setAvatarCode] = useState('')
    useEffect(() => {
        getAvatar(el.avatarUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setAvatarCode(result)
        }) 
    }, [el])
    const auth = useContext(AuthContext)
    const {divideWord} = useWord()
    const {randomKey} = useRandom()

    const gotoFriend = (id) => {
        window.location = `/user/${id}`
    }
    //Удаление из друзей
    const deleteFriend = async (id) => {
        //Изменение списка друзей пользователя
        setUserFriends([...userFriends].filter(el => el._id !== id))
        //Всплывающая подсказка
        setNoticeDisplay('block')
        setNoticeText('Вы удалили этого пользователя из друзей.')
        noticeRef.current.classList.add('notice-animation')
        //Получение ID пользователей
        const user2 = id
        //Удаление из друзей
        const response = await api.delete(`/api/deletefriend/${user2}`, {headers: 
            {Authorization: `Bearer ${auth.token}`}
        })
        localStorage.removeItem('user2')
        console.log(response)
    }
    return (
        <div key={randomKey()} onClick={() => gotoFriend(el._id)} className="user-friend-mobile">
            {isOwner ? 
                <p title="Удалить из друзей?" className="delete-friend-mobile" onClick={() => deleteFriend(el._id)}>&times;</p> : <></>}
                    <img className="user-friend-avatar-mobile" src={avatarCode} alt="friend" />
                <p className="user-friend-name-mobile">{divideWord(el.name, 25)}</p>
        </div>
    )
}

export default FriendItem