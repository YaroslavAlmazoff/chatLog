import axios from "axios"
import { useContext, useEffect, useState } from "react"
import api from '../../auth/api/auth'
import { AuthContext } from "../../context/AuthContext"
import useWord from "../../common_hooks/divideWord.hook"
import './styles/forecast.css'

const Forecast = () => {
    const {translit} = useWord()
    const auth = useContext(AuthContext)

    const [weather, setWeather] = useState(null)
    const [city, setCity] = useState('')
    
    useEffect(() => {
        if(!auth.token) return
        if(!auth.userId) return
        const getWeather = async () => {
            const URL = 'https://api.openweathermap.org/data/2.5/weather'
            const API_KEY = '928ba56fdc47f5fe29a01f2ae34f87f3'
            const response1 = await api.get(`/api/user/${auth.userId}`)
            setCity(response1.data.user.city)
            if(response1.data.user.city) {
                try {
                    const response2 = await axios.get(URL, {
                        params: {
                            q: `${translit(response1.data.user.city)},RU`,
                            units: 'metric',
                            APPID: API_KEY
                        }
                    })
                    setWeather(response2.data)
                } catch(e) {
                    console.log(e)
                }
                
            }
        }
        getWeather()
    }, [auth])

    return (
        <>
            {weather.main && 
            <div className="homepage-forecast">
                <p className="homepage-forecast-city">{city}</p>
                <p>
                    <strong className="homepage-forecast-temp">{Math.round(weather.main.temp)}&deg;, </strong>
                    <span className="homepage-forecast-text">{weather.weather[0].main}</span>
                </p>
                <img src={`https://api.openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            </div>}
        </>
    )
}

export default Forecast