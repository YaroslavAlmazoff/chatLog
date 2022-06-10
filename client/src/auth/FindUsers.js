import React, { useState } from "react"
import "../styles/find-users.css"
import api from './api/auth'


export const FindUsers = ({name}) => {
    //Непонятно что за компонент
    const [findUsers, setFindUsers] = useState('')
    const gotoUser = async (name) => {
        const response = await api.get('/api/search')
        console.log(response)
        setFindUsers('')
    }
    return (
        <div className="find-field">
            <input value={findUsers} onChange={(e) => gotoUser(e, name)} type="search" placeholder="Найти пользователя" />
        </div>
    )
}