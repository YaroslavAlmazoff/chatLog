import React, { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "./context/AuthContext"

const Main = () => {
    const auth = useContext(AuthContext)
    //получение функии навигации
    let navigate = useNavigate()
    useEffect(() => {
        //Перенаправление пользователя в зависимости от того в аккаунте он или нет
        const id = auth.userId
        console.log(id)
        if(!id) {
            if(!localStorage.getItem('registered')) {
                navigate('/register')
            } else {
                navigate('/login')
            }
        } else {
            navigate(`/home`)
        }
    }, [auth])
    return (
        <div>
        </div>
    )
}

export default Main