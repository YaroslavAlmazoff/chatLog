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
        {name: 'Chat Log Cloud', link: `/cloud`},
        {name: 'Chat Log Photographer', link: `/photos/new`},
        {name: 'Chat Log Реклама', link: `/innerad/cabinet`},
    ]
    const list3 = [
        {name: 'Моя страница', link: `/user/${auth.userId}`},
        {name: 'Сообщения', link: '/messages'},
        {name: 'Люди', link: '/users'},
        {name: 'Сервисы', link: '/services'},
    ]

    return (
        <div className="homelinks">
            {
                window.innerWidth > 500 
                ?
                <>{list1.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)}
                <hr style={{width: '100px', marginBottom: '40px'}} />
                {list2.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)}
                </>
                :
                <>{list3.map(el => <NavLink key={Date.now() + Math.random() * 100} className="homelink" to={el.link}>{el.name}</NavLink>)}
                </>
            }
        </div>
    )
}

export default Links