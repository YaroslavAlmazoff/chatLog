import '../styles/smiles.css'

const Smile = ({el, addSmile}) => {
    return (
        <div className="smile-wrapper" onClick={() => addSmile(el.code)}>
            {el.code}
        </div>
    )
}

export default Smile