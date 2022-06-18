const GettingFile = ({title, gettingFile}) => {
    const notGettingFile = () => {}
    return(
        <div>
            <h3 className='notice-title'>{title}</h3>
            <div>
                <button onClick={gettingFile} className='notice-button'>Принять</button>
                <button onClick={notGettingFile} className='notice-button'>Отклонить</button>   
            </div>    
        </div>  
    )
}

export default GettingFile