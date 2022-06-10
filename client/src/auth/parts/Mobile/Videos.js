import "../../styles/user-mobile.css"
import UserVideoMobile from "./UserVideoMobile"
import useWord from "../../../common_hooks/divideWord.hook"
import UserPostMobile from "./UserPostMobile"

const Videos = ({
    deletePost, userPosts,
    setUserPosts, isOwner,
    userVideos, deleteVideo, setUserVideos}) => {
    //Центральная часть страницы пользователя - список его постов
    const {divideWord} = useWord()
    return (
        <div className="user-center-side-mobile">
                    <div className="user-videos-mobile" style={{display: !userVideos[0] ? 'none': 'block'}}>
                        {!userVideos[0] ? <p className="nothing">У вас нет видео.</p>
                        : userVideos.map(el => <UserVideoMobile
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
                    
                    <div className="user-posts-mobile">
                    {!userPosts[0] ? <p className="nothing">У вас нет записей.</p>
                    : userPosts.map((el) => <UserPostMobile 
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

export default Videos