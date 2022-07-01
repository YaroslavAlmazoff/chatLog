import '../styles/smiles.css'

const Smile = ({el}) => {
    return (
        <div className="smile-wrapper">
            <img className="smile" src={el.imageUrl} alt="smile" />
        </div>
    )
}

export default Smile