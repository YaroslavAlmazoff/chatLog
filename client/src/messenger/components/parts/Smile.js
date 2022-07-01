import '../styles/smiles.css'

const Smile = ({el}) => {
    return (
        <div className="smile-wrapper">
            <img className="smile" src={require(`../../img/smiles/${el.id}.png`)} alt="smile" />
        </div>
    )
}

export default Smile