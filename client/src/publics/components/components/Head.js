const Head = ({pub, isAdmin}) => {
    return (
        <div className="public-head">
            <div className="public-info">
                <div className="public-top-info">
                    <img className="public-avatar" src={process.env.REACT_APP_API_URL + `/publicavatars/` + pub.avatarUrl} alt="avatar" />
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
                    <img className="public-action-img" src={require('../../img/pencil')} alt="edit" />
                    <p className="public-action-name">Редактировать</p>
                </div>
                <div className="public-action">
                    <img className="public-action-img" src={require('../../img/notifications')} alt="notifications" />
                    <p className="public-action-name">Уведомления</p>
                </div>
            </div>:<div></div>}
        </div>
    )
}

export default Head