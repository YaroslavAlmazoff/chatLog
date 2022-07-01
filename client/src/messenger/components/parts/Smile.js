import '../styles/smiles.css'

const Smile = ({el, addSmile}) => {
    return (
        <div className="smile-wrapper" onClick={() => addSmile(el.code)}>
            <p>{el.code}</p>
        </div>
    )
}

export default Smile