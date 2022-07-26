import axios from "axios"
import { useContext, useEffect } from "react"
import api from '../../auth/api/auth'
import { AuthContext } from "../../context/AuthContext"

const Forecast = () => {
    const auth = useContext(AuthContext)
    
    useEffect(() => {
        if(!auth.token) return
        const getWeather = async () => {
            const URL = 'https://api.openweathermap.org/data/2.5/weather'
            const API_KEY = '928ba56fdc47f5fe29a01f2ae34f87f3'
            const response1 = await api.get('/api/user', {
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            })
            if(response1) {
                const response2 = await axios.get(URL, {
                    params: {
                        q: response1.user.city,
                        units: 'metric',
                        APPID: API_KEY
                    }
                })
                console.log(response2)
            }
        }
        getWeather()
    }, [auth])

    return (
        <div className="homepage-forecast">

        </div>
    )
}

export default Forecast