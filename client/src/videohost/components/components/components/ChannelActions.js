import { useContext, useState } from "react"
import { useParams } from "react-router"
import api from '../../../../auth/api/auth'
import Modal from "../../../../common_components/Modal"
import { ChannelContext } from "../../context/ChannelContext"
import { AuthContext } from '../../../../context/AuthContext'

const ChannelActions = () => {
    const params = useParams()
    const auth = useContext(AuthContext)
    const isAdmin = useContext(ChannelContext).admin === auth.userId
    const [modal, setModal] = useState('none')
    //TODO: Actions icons

    const newVideo = () => {
        window.location = '/videhost/createvideo'
    }
    const editChannel = () => {
        window.location = `/videohost/editchannel/${params.id}`
    }
    const openModal = () => {
        setModal('block')
    }
    const deleteChannel = async () => {
        const response = await api.delete(`/videohost/channels/delete/${params.id}`)
        console.log(response)
        window.location = '/videohost/main'
    }


    return (
        isAdmin && 
        <>
        <Modal title="Удаление канала" text="Вы действительно хотите удалить канал?" okButton={true} cancelButton={true} okFunction={deleteChannel} action="Удалить" display={modal} setDisplay={setModal} />
        <div className="videohost-channel-actions">
            <div onClick={newVideo} className="videohost-channel-action">
                <img className="videohost-channel-action-icon" alt="" />
                <span className="videohost-channel-action-name">Новое видео</span>
            </div>
            <div onClick={editChannel} className="videohost-channel-action">
                <img className="videohost-channel-action-icon" alt="" />
                <span className="videohost-channel-action-name">Обновить канал</span>
            </div>
            <div onClick={openModal} className="videohost-channel-action">
                <img className="videohost-channel-action-icon" alt="" />
                <span className="videohost-channel-action-name">Удалить канал</span>
            </div>
        </div>
        </>
    )
}

export default ChannelActions