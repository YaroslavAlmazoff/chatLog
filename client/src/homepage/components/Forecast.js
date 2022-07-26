import axios from "axios"
import { useContext, useEffect } from "react"
import api from '../../auth/api/auth'
import { AuthContext } from "../../context/AuthContext"
import useWord from "../../common_hooks/divideWord.hook"

const Forecast = () => {
    const {translit} = useWord()
    const auth = useContext(AuthContext)
    
    useEffect(() => {
        if(!auth.token) return
        if(!auth.userId) return
        const getWeather = async () => {
            const URL = 'https://api.openweathermap.org/data/2.5/weather'
            const API_KEY = '928ba56fdc47f5fe29a01f2ae34f87f3'
            const response1 = await api.get(`/api/user/${auth.userId}`)
            if(response1.data.user.city) {
                const response2 = await axios.get(URL, {
                    params: {
                        q: translit(response1.data.user.city),
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