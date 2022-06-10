import {NavLink} from "react-router-dom"
import {useContext} from "react"
import {AuthContext} from "../../context/AuthContext"

const Links = () => {
    const auth = useContext(AuthContext)
    const list1 = [
        {name: 'Моя страница', link: `/user/${auth.userId}`},
        {name: 'Сообщения', link: '/messages'},
        {name: 'Люди', link: '/users'},
    ]
    const list2 = [
        {name: 'Join Cloud', link: '/cloud'},
    ]

    return (
        <div className="homelinks">
            {list1.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)}
            <hr style={{width: '100px', marginBottom: '40px'}} />
            {/*list2.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)*/}
            {/*<hr style={{width: '100px', marginBottom: '40px'}} />*/}
            {/*list3.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)*/}
        </div>
    )
}

export default Links