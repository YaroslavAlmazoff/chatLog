import './styles/head.css'
import { useRef, useEffect, useState, useContext } from "react"
import useDaytime from '../hooks/daytime.hook'
import api from '../../auth/api/auth'
import { AuthContext } from '../../context/AuthContext'

const Head = () => {
    const auth = useContext(AuthContext)
    const {getDaytime} = useDaytime()
    const [user, setUser] = useState({})

    let clockRef = useRef(null)
    useEffect(() => {
            setInterval(() => {
                 let now = new Date()
                 clockRef.current.innerHTML = now.toLocaleTimeString()
            }, 1000)
    }, [])

    useEffect(() => {
        const getUser = async () => {
            const response = await api.get('/api/user', {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            setUser(response.data.user)
        }
        getUser()
    }, [])

    return (
        <div className="head">
            {window.screen.width > 700 
            ? <div className='daytime'>
            <h2 className='time'>{getDaytime(user.name)}&nbsp;&nbsp;&nbsp;&nbsp;</h2>
            <div ref={clockRef} className="time"></div>
        </div> : <></>
            }
            {window.screen.width < 700 && window.screen.width > 500
            ? <div className='daytime'>
            <p className='time'>{getDaytime(user.name)}&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <div ref={clockRef} className="time"></div>
        </div> : <></>
            }
            {window.screen.width < 500 
            ? <div className='daytime'>
            <p className='time'>{getDaytime(user.name)}&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <div ref={clockRef} className="time"></div>
        </div> : <></>
            }
            
        </div>
    )
}

export default Head