import './styles/loader.css'

const Loader = ({ml}) => {
    //Компонент загрузки
    return (
        <div className="lds-spinner" style={{marginLeft: ml}} ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    )
}

export default Loader