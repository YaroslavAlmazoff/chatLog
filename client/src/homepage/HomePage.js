import Links from './components/Links'
import Head from './components/Head'
import Search from './components/Search'
import Forecast from './components/Forecast'
import News from './components/News'
import './homepage.css'
import { useEffect, useState, useRef } from 'react'
import api from '../auth/api/auth'

const HomePage = () => {
    const homeRef = useRef(null)
    const [theme, setTheme] = useState('')
    useEffect(() => {
        const verify = async () => {
            const response = await api.get('api/verify', {headers:{
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }})
            if(!response.data.verified) {
                window.location = '/login'
            }
        }
        verify()
        setTheme(require(`./img/backgrounds/${localStorage.getItem('theme')}/${Math.floor(Math.random() * 5) + 1}.jpg`))
        homeRef.current.scrollTop = 50;
    },[])
    return (
        <div ref={homeRef} className="homepage" style={{backgroundImage: `url(${theme})`}}>
            <Links />
            <div className="body">
                <Head />
                <Search />
                <Forecast />
                <News />
            </div>
        </div>
    )
}

export default HomePage