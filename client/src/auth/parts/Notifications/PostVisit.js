import {Link} from "react-router-dom"

const SimplePosts = ({title, postType, postID}) => {
    return(
        <div>
            <h3 className='notice-title'>{title}
            <Link style={{color: 'black'}} to={`/${postType}/${postID}`}>Посмотреть</Link></h3>   
        </div>  
    )
}

export default SimplePosts