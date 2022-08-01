import { useState } from "react"
import { useParams } from "react-router"
import api from '../../../../auth/api/auth'
import Modal from "../../../../common_components/Modal"

const VideoMiddleSide = () => {
    const params = useParams()
    const [modal, setModal] = useState('none')

    const editVideo = () => {
        window.location = `/videohost/editvideo/${params.id}`
    }
    const openModal = () => {
        setModal('block')
    }
    const deleteChannel = async () => {
        const response = await api.delete(`/videohost/channels/delete/${params.id}`)
        console.log(response)
        window.location = '/videohost/main'
    }
    //TODO: Actions icons
    return (
        <>
        <Modal title="Удаление видео" text="Вы действительно хотите удалить это видео?" okButton={true} cancelButton={true} okFunction={deleteChannel} action="Удалить" display={modal} setDisplay={setModal} />
        <div className="videohost-video-middle-side">
            <div onClick={editVideo} className="videohost-video-action">
                <img className="videohost-video-action-icon" alt="" />
                <span className="videohost-video-action-name">Редактировать видео</span>
            </div>
            <div onClick={openModal} className="videohost-video-action">
                <img className="videohost-video-action-icon" alt="" />
                <span className="videohost-video-action-name">Удалить видео</span>
            </div>
        </div>
        </>
        
    )
}

export default VideoMiddleSide