import React, { useEffect, useState, useRef, useContext } from "react"
import "./styles/user.css"
import { useParams } from "react-router"
import api from "./api/auth"
import useDate from "../common_hooks/date.hook"
import UserRightSide from "./parts/UserRightSide"
import UserCenterSide from "./parts/UserCenterSide"
import UserLeftSide from "./parts/UserLeftSide"
import UserNav from "./parts/UserNav"
import useWord from "../common_hooks/divideWord.hook"
import usePosts from "./hooks/usePosts"
import Notifications from "./parts/Notifications"
import Loader from "../common_components/Loader"
import { AuthContext } from "../context/AuthContext"

import Nav from "./parts/Mobile/Nav"
import Friends from "./parts/Mobile/Friends"
import Actions from "./parts/Mobile/Actions"
import Fotos from "./parts/Mobile/Fotos"
import Videos from "./parts/Mobile/Videos"


const User = () => {
    //Страница пользователя
    const auth = useContext(AuthContext)
    //Получение функций из кастомных хуков для взаимодействия с постами пользователя, сокращением слов, датой
    const {send, sendFoto, deleteFoto, deletePost, deleteVideo} = usePosts()
    const {divideWord} = useWord()
    const {getCurrentDate} = useDate()
    //Получение параметров
    const params = useParams()
    const fileRef2 = useRef()

    const [userPosts, setUserPosts] = useState([])
    const [userVideos, setUserVideos] = useState([])
    //Определение является ли пользователь владельцем страницы
    const isOwner = auth.userId === params.id
    /*
    Инициализация состояний для:
        Ввода текста поста;
        Дисплея предпросмотра изображения для поста;
        Url предпросмотра изображения для поста;
        Дисплея предпросмотра фотографии;
        Url предпросмотра изображения фотографии;
        Друзей пользователя;
        Подписок пользователя;
        Постов пользователя;
        Фотографий пользователя;
        Уведомлений пользователя;
        Дисплея всплывающей подсказки;
        Текста всплывающей подсказки;
        Дисплея блока с уведомлениями;
        Файла изображения поста;
        Файла фотографии;
    */
    
    const [imagePreviewDisplay2, setImagePreviewDisplay2] = useState('none')
    const [imagePreviewUrl2, setImagePreviewUrl2] = useState('')
    const [userFriends, setUserFriends] = useState([])
    const [userSubscribes, setUserSubscribes] = useState([])
    const [userFotos, setUserFotos] = useState([])
    const [notifications, setNotifications] = useState([])
    const [noticeDisplay, setNoticeDisplay] = useState('none')
    const [noticeText, setNoticeText] = useState('Уведомление')
    const [notificationsDisplay, setNotificationsDisplay] = useState(false)
    const [file2, setFile2] = useState('')
    //Содание ссылки на всплывающую ссылку
    const noticeRef = useRef()
    const notificationRef = useRef(null)
    //Показ уведомлений
    const showNotifications = async () => {
        await api.get(`/api/checknotification/${auth.userId}`,{ headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        
        if(!notificationsDisplay) {
            notificationRef.current.remove()
            setNotificationsDisplay(true)
        } else {
            setNotificationsDisplay(false)
        }
    }
    //Начальное состояние пользователя
    const [user, setUser] = useState({
        name: '',
        surname: '', 
        age: 0,
        avatarUrl: 'user.png',
        bannerUrl: '',
        friends: [],
        subscribes: [],
        articles: [],
        fotos: []
    })
    //Эмитирование открытия загрузки файла фотографии пользователя
    const emitOpen2 = () => {
        fileRef2.current.click()
    }
    
    //Получение файла фотографии пользователя
    const getFile2 = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImagePreviewDisplay2('block')
            setImagePreviewUrl2(ev.target.result)
        }
        reader.readAsDataURL(file)
        //Загрузка файла в состояние
        setFile2(file)
    }

    useEffect(() => {
        //Получение информации о пользователе
        const findUser = async () => {
            const userdata = await api.get(`/api/user/${params.id}`)
            //Помещение информации о пользователе в состояние
            setUser(userdata.data.user)
            //Получение друзей пользователя
            const friendsID = userdata.data.user.friends
            let friends = []
            for(let i = 0; i < friendsID.length; i++) {
                const data = await api.get(`/api/user/${friendsID[i]}`)
                friends.push(data.data.user)
            }
            //Помещение друзей пользователя в состояние
            setUserFriends(friends)
            //Todo: Подписки пользователя
            setUserSubscribes([
                {name: 'Программирование', avatar: 'group.png'},
                {name: 'Космос', avatar: 'group.png'},
                {name: 'Фото космос', avatar: 'group.png'},
                {name: 'Астрономия', avatar: 'group.png'},
                {name: 'PHP', avatar: 'group.png'},
                {name: 'JAVASCRIPT', avatar: 'group.png'},
                {name: 'HTML', avatar: 'group.png'},
                {name: 'Frontend', avatar: 'group.png'},
                {name: 'CSS', avatar: 'group.png'},
                {name: 'Backend', avatar: 'group.png'},
            ])
            //Получение постов пользователя
            const response = await api.get(`/api/getuserposts/${params.id}`)
            //Помещение постов пользователя в состояние
            setUserPosts(response.data.articles.reverse())
            //Получение фотографий пользователя
            const response2 = await api.get(`/api/getuserfotos/${params.id}`)
            //Помещение фотографий пользователя в состояние
            setUserFotos(response2.data.fotos.reverse())
            //Получение видео пользователя
            const response3 = await api.get(`/api/getuservideos/${params.id}`)
            //Помещение видео пользователя в состояние
            setUserVideos(response3.data.videos.reverse())
        }
        //Получение уведомлений
        const getNotifications = async () => {
            const response = await api.get(`/api/getnotifications/${params.id}`)
            //Помещение уведомлений в состояние
            setNotifications([...response.data.notifications].reverse())
        } 
        const visit = async () => {
            await api.get(`/api/visit/${params.id}`, {headers: 
                {Authorization: `Bearer ${auth.token}`}
            })
        }
        visit()
        findUser()
        getNotifications()
    }, [params, auth])

    let width = window.innerWidth

    return (
        <div>
           {width > 500 ? 
            <div className="user">
            <UserNav 
                user={user}
                isOwner={isOwner}                     
                noticeDisplay={noticeDisplay}
                setNoticeDisplay={setNoticeDisplay} 
                noticeText={noticeText}
                noticeRef={noticeRef}
            />
            {user.name === 'unnamed' ? <Loader ml={'50%'} /> 
            : <div className="user-content">
            <UserLeftSide 
                userFriends={userFriends} 
                userSubscribes={userSubscribes} 
                divideWord={divideWord} 
                isOwner={isOwner}
                setUserFriends={setUserFriends}
                noticeDisplay={noticeDisplay}
                setNoticeDisplay={setNoticeDisplay}
                setNoticeText={setNoticeText}
                noticeRef={noticeRef}
            />
            <UserCenterSide 
                send={send} 
                deletePost={deletePost} 
                deleteVideo={deleteVideo}
                userPosts={userPosts} 
                userVideos={userVideos}
                setUserVideos={setUserVideos}
                divideWord={divideWord}
                getCurrentDate={getCurrentDate}
                params={params}
                setUserPosts={setUserPosts}
                isOwner={isOwner}
            />
            {notificationsDisplay ? <Notifications 
                showNotifications={showNotifications} 
                notifications={notifications} 
                setNotifications={setNotifications}
                userFriends={userFriends}
                setUserFriends={setUserFriends}
                setNoticeDisplay={setNoticeDisplay}
                setNoticeText={setNoticeText}
                noticeRef={noticeRef}
                params={params}
            /> : 
            <UserRightSide getFile2={getFile2} 
                emitOpen2={emitOpen2} 
                fileRef2={fileRef2} 
                imagePreviewUrl2={imagePreviewUrl2} 
                imagePreviewDisplay2={imagePreviewDisplay2} 
                sendFoto={sendFoto} userFotos={userFotos} 
                deleteFoto={deleteFoto} 
                params={params}
                file2={file2}
                getCurrentDate={getCurrentDate}
                setUserFotos={setUserFotos}
                isOwner={isOwner}
                showNotifications={showNotifications}
                notificationRef={notificationRef}
            />}

        </div>}
    </div>
: <div className="user-mobile">
    <Nav user={user} 
        noticeDisplay={noticeDisplay} 
        setNoticeDisplay={setNoticeDisplay} 
        noticeText={noticeText} 
        noticeRef={noticeRef} 
    />
    <Friends 
        userFriends={userFriends} 
        isOwner={isOwner} 
        setUserFriends={setUserFriends} 
        setNoticeDisplay={setNoticeDisplay} 
        setNoticeText={setNoticeText} 
        noticeRef={noticeRef} 
    />
    <Actions isOwner={isOwner} 
        setNoticeDisplay={setNoticeDisplay} 
        setNoticeText={setNoticeText} 
        noticeRef={noticeRef} 
        notificationsDisplay={notificationsDisplay}
        setNotificationsDisplay={setNotificationsDisplay}
    />
    {notificationsDisplay ? 
    <Notifications 
        showNotifications={showNotifications} 
        notifications={notifications} 
        setNotifications={setNotifications}
        userFriends={userFriends}
        setUserFriends={setUserFriends}
        setNoticeDisplay={setNoticeDisplay}
        setNoticeText={setNoticeText}
        noticeRef={noticeRef}
        params={params}
    />
    : <></>    
}
    <Fotos userFotos={userFotos} 
        setUserFotos={setUserFotos} 
        isOwner={isOwner} 
        showNotifications={showNotifications} 
        getFile2={getFile2} 
        emitOpen2={emitOpen2} 
        fileRef2={fileRef2} 
        file2={file2} 
        imagePreviewDisplay2={imagePreviewDisplay2} 
        imagePreviewUrl2={imagePreviewUrl2} 
    />
    <Videos deletePost={deletePost} 
        userPosts={userPosts} 
        setUserPosts={setUserPosts} 
        isOwner={isOwner} 
        userVideos={userVideos} 
        setUserVideos={setUserVideos} 
        deleteVideo={deleteVideo} 
    />
</div>
} 
</div> 
        
        
        
    )
}

export default User