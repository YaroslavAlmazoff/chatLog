const Subscriber = ({item}) => {
    return (
        <div className="subscriber">
            <img className="subscriber-avatar" src={process.env.REACT_APP_API_URL + `/useravatars/` + item.avatarUrl} alt="avatar" />
            <p className="subscriber-name"></p>
        </div>
    )
}

export default Subscriber