import React, {useState, useEffect, useContext} from "react";
import "../styles/comment.css"
import api from "../api/auth"
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import useFiles from '../../common_hooks/files.hook'

const UserArticleComment = ({comment, date, user, id, articleComments, setArticleComments, comments, setComments}) => {
    const auth = useContext(AuthContext)
    const params = useParams()
    //Комментарий к посту пользователя
    //Инициализация состояния комментирующего пользователя
    const [commenter, setCommenter] = useState({
        name: 'User',
        surname: 'User',
        avatarUrl: 'user.png'
    })
    const deleteComment = async (id) => {
        setArticleComments(articleComments - 1)
        setComments([...comments].filter(el => {
            console.log(el._id === id)
            return el._id !== id
        }))
        await api.delete(`/api/deletecomment/${id}/${params.id}`)
    }
    useEffect(() => {
        //Получение комментирующего пользователя
        const getCommenter = async () => {
            const response = await api.get(`/api/user`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
            setCommenter(response.data.user)
        }
        getCommenter()
    }, [auth])
    const gotoCommenter = () => {
        window.location = `/user/${user}`
    }
    return (
        <div className="comment-foto">
            {user === auth.userId 
            ? <p className="delete-comment" onClick={() => deleteComment(id)}>&times;</p>
            : <></>}
            <div className="comment-head">
                <div className="user-info">
                    <img onClick={gotoCommenter} className="comment-user-img" src={process.env.REACT_APP_API_URL + '/useravatars/' + commenter.avatarUrl} alt="user"/>
                    <p onClick={gotoCommenter} className="comment-user-name">{commenter.name} {commenter.surname}</p>
                </div>
                <p className="comment-date">{date}</p>
            </div>
            <h4 className="comment-body">{comment}</h4>
        </div>
    )
}

export default UserArticleComment