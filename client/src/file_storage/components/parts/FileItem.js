import '../../styles/file-item.css'
import useWord from '../../../common_hooks/divideWord.hook'
import useFiles from '../../../common_hooks/files.hook'
import { useState, useEffect, useContext } from 'react'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'

const FileItem = ({file, setSelectedFile, setDetailDisplay, setFilePreviewDisplay}) => {
    const [contextMenu, setContextMenu] = useState(null)
    const auth = useContext(AuthContext)
    const {divideFilename} = useWord()
    const showDetails = () => {
        hideContextMenu()
        setSelectedFile(file)
        setDetailDisplay('flex')
        setFilePreviewDisplay('none')
    }
    const deleteFile = async () => {
        await api.get(`/api/cloud/delete/${file.name}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        window.location.reload()
    }
    const openContextMenu = (e) => {
        e.preventDefault()
        setContextMenu(
            <div style={{marginLeft: e.pageX + 'px', top: e.pageY + 'px'}} className='context-menu'>
                <a className='context-menu-upload' href={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name} download={file.name}>Скачать</a>
                <hr />
                <p onClick={deleteFile} className='context-menu-delete'>Удалить</p>
            </div>
        )
    }
    const hideContextMenu = () => {
        setContextMenu(null)
    }
    return (
        <div onClick={showDetails} onContextMenu={(e) => openContextMenu(e)} className="file-item">
            {contextMenu}
            {file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp' ? 
            <img className='file-img' src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name} alt="file" />
            :   <div>
            {file.ext === 'mp4' ? 
            <video  className='file-img' width="300" height="200" controls src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name}>
            </video>
            : <div>
                {file.ext !== 'mp4' || file.ext !== 'jpg' || file.ext !== 'png' || file.ext !== 'bmp' || file.ext !== 'gif' 
            ? <img className='file-icon' src={process.env.REACT_APP_API_URL + `/filesicons/` + file.ext + '.png'} alt="img" />
            : <></>
            }</div>}</div>}
            
            <p className='file-title'>{divideFilename(file.name)}</p>
        </div>
    )
}

export default FileItem