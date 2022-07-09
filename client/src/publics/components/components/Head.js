import '../../styles/head.css'

const Head = ({pub, isAdmin}) => {
    return (
        <div className="public-head" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + `/publicbanners/` + pub.avatarUrl})`}}>
            <div className="public-info">
                <div className="public-top-info">
                    {pub.avatarUrl ? <img className="public-avatar" src={process.env.REACT_APP_API_URL + `/publicavatars/` + pub.avatarUrl} alt="avatar" /> : <img className='public-avatar' src={require('../../img/group.png')} alt="нету аватарки" />}
                    <p className="public-description">{pub.description}</p>
                </div>
                <div className="public-bottom-info">
                    <p className="public-name">{pub.name}</p>
                    {!isAdmin ? <button className="public-subscribe">+ Подписаться</button>: <div></div>}
                </div>
            </div>
            {isAdmin ? <div className="public-actions">
                <div className="public-action">
                    <img className="public-action-img" src={require('../../img/article.png')} alt="article" />
                    <p className="public-action-name">Новая статья</p>
                </div>
                <div className="public-action">
                    <img className="public-action-img" src={require('../../img/pencil.png')} alt="edit" />
                    <p className="public-action-name">Редактировать</p>
                </div>
                <div className="public-action">
                    <img className="public-action-img" src={require('../../img/notifications.png')} alt="notifications" />
                    <p className="public-action-name">Уведомления</p>
                </div>
            </div>:<div></div>}
        </div>
    )
}

export default Head