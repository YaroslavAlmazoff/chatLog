import React, { useEffect, useMemo, useState } from "react"
import UserItem from "./parts/UserItem"
import "./styles/users.css"
import useRandom from "../common_hooks/random.hook"
import api from "./api/auth"
import UsersFilterSide from "./parts/UsersFilterSide"
import UsersSearchSide from "./parts/UsersSearchSide"
import Loader from "../common_components/Loader"
import ShowAd from "../inner_ad/components/components/ShowAd"

const Users = () => {
    //Страница всех пользователей и их поиска

    const [selectAge, setSelectAge] = useState('Выберите возраст')
    const [selectCountry, setSelectCountry] = useState('Выберите страну')
    const [searchValue, setSearchValue] = useState('Поиск...')
    //Получение функции рандомного ключа из кстомного хука
    const {randomKey} = useRandom()
    //Инициализация состояния списка пользователей
    const [users, setUsers] = useState([])
    const [usersReserve, setUsersReserve] = useState([])
    useEffect(() => {
        //Получение списка пользователей
        const getUsers = async () => {
            const response = await api.get('/api/users')
            //Помещение списка пользователей в состояние
            setUsers(response.data.users)
            setUsersReserve(response.data.users)
        }
        getUsers()
    }, [])
    const sortedUsersByAge = useMemo(() => {
        return [...users].filter(el => { 
            return el.age === selectAge || selectAge === 'Выберите возраст'
        })
    },[users, selectAge])

    const sortedUsersByCountry = useMemo(() => {
        return [...sortedUsersByAge].filter(el => { 
            return el.country.toLowerCase() === selectCountry.toLowerCase() || selectCountry === 'Выберите страну'
        })
    },[sortedUsersByAge, selectCountry])

    const searchedUsers = useMemo(() => {
        return [...sortedUsersByCountry].filter(el => {
            return el.name.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.surname.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.country.toLowerCase().includes(searchValue.toLowerCase()) || 
            el.city.toLowerCase().includes(searchValue.toLowerCase()) || 
            searchValue === 'Поиск...'
        })
    }, [sortedUsersByCountry, searchValue])

    return (
        <div className="users">
                <div className="users-ads">
                    <UsersFilterSide users={users} setUsers={setUsers} usersReserve={usersReserve} setSelectAge={setSelectAge} setSelectCountry={setSelectCountry} />
                    <ShowAd />
                </div>
                {!users[0] ? <Loader ml={'0%'} /> : <div className="users-list">
                    {searchedUsers.map(el => <UserItem key={randomKey()} name={el.name} surname={el.surname} age={el.age} avatarUrl={el.avatarUrl} id={el._id} />)}
                </div>}
                <div className="users-ads">
                    <UsersSearchSide searchValue={searchValue} setSearchValue={setSearchValue} />  
                    <ShowAd />
                </div>
                
        </div>    
    )
}

export default Users