const Message = ({item}) => {
    return (
        <div className="admin-message">
            <p className="admin-message-text">{item.text}</p>
        </div>
    )
}

export default Message