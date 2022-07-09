const Post = ({item}) => {
    return (
        <div className="public-post">
            <img className="public-post-img" src={process.env.REACT_APP_API_URL + `/publicposts/` + item.imageUrl} alt="avatar" />
            <div className="public-post-info">
                <p className="public-post-text">{item.text}</p>
                <p className="public-post-date">{item.date}</p>
                <div className="public-post-reactions">
                    <img className="public-post-reaction" src={require('../../../../auth/img/like_hollow.jpg')} alt="" />
                    <img className="public-post-reaction" src={require('../../../../auth/img/comment.png')} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Post