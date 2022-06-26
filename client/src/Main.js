import React, { useEffect } from "react"
import { useNavigate } from "react-router"

const Main = ({isAuthenticated, isVerified}) => {
    //получение функии навигации
    let navigate = useNavigate()
    useEffect(() => {
        //Перенаправление пользователя в зависимости от того в аккаунте он или нет
        console.log(isAuthenticated, isVerified)
        if(isAuthenticated && isVerified) {
            navigate('/home')
        } else {
            if(localStorage.getItem('registered')) {
                navigate('/login')
            } else {
                navigate('/greeting')
            }
        }
    }, [isAuthenticated, isVerified])
    return (
        <div>
        </div>
    )
}

export default Main