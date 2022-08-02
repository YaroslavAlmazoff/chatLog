import { useEffect, useState } from "react"
import React from "react"
import { useParams } from "react-router"
import api from '../../../auth/api/auth'
import { ChannelContext } from "../context/ChannelContext"
import Head from "../components/Head"
import ChannelMiddleSide from "../components/ChannelMiddleSide"
import ChannelVideos from "../components/ChannelVideos"
import '../../styles/channel.css'

const Channel = () => {
    const params = useParams()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [bannerUrl, setBannerUrl] = useState('')
    const [subscribers, setSubscribers] = useState(0)
    const [admin, setAdmin] = useState('')
    
    useEffect(() => {
        const getChannel = async () => {
            const response = await api.get(`/api/videohost/channels/channel/${params.id}`)
            setName(response.data.channel.name)
            setDescription(response.data.channel.description)
            setAvatarUrl(response.data.channel.avatarUrl)
            setBannerUrl(response.data.channel.bannerUrl)
            setSubscribers(response.data.channel.subscribers.length)
            setAdmin(response.data.channel.admin)
        }
        getChannel()
    }, [params])

    return (
        <div className="videohost-channel">
            <ChannelContext.Provider value={{
                name, description, avatarUrl, bannerUrl, subscribers, admin
            }}>
                <Head />
                <ChannelMiddleSide />
                <ChannelVideos />
            </ChannelContext.Provider>
        </div>
    )
}

export default Channel