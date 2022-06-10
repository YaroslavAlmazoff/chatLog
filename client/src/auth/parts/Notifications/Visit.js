import {Link} from "react-router-dom"

const Visit = ({title, from}) => {
    return(
        <div>
            <h3 className='notice-title'>{title}
            <Link style={{color: 'black'}} to={`/user/${from}`}>Посмотреть его профиль</Link></h3>   
        </div>  
    )
}

export default Visit