import React, { useContext, useEffect, useState } from "react"
import useRandom from '../../../common_hooks/random.hook'
import RoomItem from "../parts/RoomItem"
import "../styles/room-list.css"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"

export const RoomsList = () => {
    const auth = useContext(AuthContext)
    const {randomKey} = useRandom()
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        const getRooms = async () => {
            const response = await api.get(`/api/getrooms`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            console.log(response)
            setRooms(response.data.rooms)
        }
        getRooms()
    }, [auth])

    return (
        <div className="room-list">
            <h1>Сообщения</h1>
            <div className="rooms-list-wrapper">
                {rooms.map(el => <RoomItem 
                    key={randomKey()}
                    lastMessage={el.lastMessage}
                    user1={el.user1}
                    user2={el.user2}
                    id={el._id}
                />)}
            </div>
    </div>
    )
}