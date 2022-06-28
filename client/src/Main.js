import React, { useEffect } from "react"

const Main = ({isAuthenticated, isVerified}) => {
    //получение функии навигации
    useEffect(() => {
        //Перенаправление пользователя в зависимости от того в аккаунте он или нет
        console.log(isAuthenticated, isVerified)
        if(isAuthenticated && isVerified) {
            window.location = '/home'
        } else {
            if(localStorage.getItem('registered')) {
                window.location = '/login'
            } else {
                window.location = '/greeting'
            }
        }
    }, [isAuthenticated, isVerified])
    return (
        <div>
        </div>
    )
}

export default Main