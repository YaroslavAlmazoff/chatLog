import React, { useContext, useEffect, useState } from "react"
import useRandom from '../../../common_hooks/random.hook'
import RoomItem from "../parts/RoomItem"
import "../styles/room-list.css"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"
import ShowAd from "../../../inner_ad/components/components/ShowAd"

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
        <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <ShowAd width={'28%'} />
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
            <ShowAd width={'28%'} />
        </div>
        
    )
}