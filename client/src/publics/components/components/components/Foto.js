const Foto = ({item}) => {
    return (
        <div className="public_foto">
            <img className="public-foto-img" src={process.env.REACT_APP_API_URL + `/publicfotos/` + item.imageUrl} alt="avatar" />
        </div>
    )
}

export default Foto