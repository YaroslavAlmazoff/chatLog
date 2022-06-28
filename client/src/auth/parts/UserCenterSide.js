import UserPost from "./UserPost"
import "../styles/user.css"
import UserVideo from "./UserVideo"
import { useParams } from "react-router"

const UserCenterSide = ({
            deletePost, userPosts, divideWord,
            setUserPosts, isOwner,
            userVideos, deleteVideo, setUserVideos
    }) => {
        const params = useParams()
        const isAdmin = params.id === '628e5aab0153706a3e18fe79'
        const gotoCreatePostPage = () => {
            window.location = '/createpost'
        }
        const gotoAdmin = () => {
            window.location = `/admin/${params.id}`
        }
    //Центральная часть страницы пользователя - список его постов
    return (
        <div className="user-center-side">
                    {isOwner ? <button className="user-add-foto" onClick={gotoCreatePostPage}>Создать новую запись</button> : <></>}
                    {isOwner && isAdmin ? <button className="user-add-foto" onClick={gotoAdmin}>Кабинет администратора</button> : <></>}
                    <div className="user-videos" style={{display: !userVideos[0] ? 'none': 'block'}}>
                        {!userVideos[0] ? <p className="nothing">У вас нет видео.</p>
                        : userVideos.map(el => <UserVideo
                            key={el._id}
                            deletePost={deletePost} 
                            setUserVideos={setUserVideos}
                            userVideos={userVideos}
                            id={el._id} 
                            title={el.title} 
                            date={el.date} 
                            imageUrl={el.imageUrl} 
                            likes={el.likes} 
                            comments={el.comments} 
                            deleteVideo={deleteVideo}
                            divideWord={divideWord} 
                            setUserPosts={setUserPosts} 
                            userPosts={userPosts} 
                            isOwner={isOwner}
                        />)}
                        
                    </div>
                    
                    <div className="user-posts">
                    {!userPosts[0] ? <p className="nothing">У вас нет записей.</p>
                    : userPosts.map((el) => <UserPost 
                        key={el._id}
                        deletePost={deletePost} 
                        setUserVideos={setUserVideos}
                        userVideos={userVideos}
                        id={el._id} 
                        title={el.title} 
                        date={el.date} 
                        imageUrl={el.imageUrl} 
                        likes={el.likes} 
                        comments={el.comments} 
                        divideWord={divideWord} 
                        setUserPosts={setUserPosts} 
                        userPosts={userPosts} 
                        isOwner={isOwner}
                    />)}
                    </div>
                </div>
    )
}

export default UserCenterSide