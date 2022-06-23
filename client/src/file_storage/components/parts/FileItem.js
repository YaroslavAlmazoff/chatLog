import '../../styles/file-item.css'
import useWord from '../../../common_hooks/divideWord.hook'
import useFiles from '../../../common_hooks/files.hook'
import { useState, useEffect, useContext } from 'react'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'

const FileItem = ({file, setSelectedFile, setDetailDisplay, setFilePreviewDisplay, contextMenu, setContextMenu}) => {
    const {getFileIcon, getFile} = useFiles()
    const auth = useContext(AuthContext)
    const [fileCode, setFileCode] = useState('')
    const [downloadingFileCode, setDownloadingFileCode] = useState('')
    useEffect(() => {
        if(file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp') {
            getFile(file).then((data) => {
                const result = 'data:image/jpeg;base64,' + data
                setFileCode(result)
            })
        } else if(file.ext === 'avi' || file.ext === 'mp4') {
            getFile(file).then((data) => {
                const result = 'data:video/mp4;base64,' + data
                setFileCode(result)
            })
        } else if(file.ext === 'ai' || file.ext === 'apk' || 
                  file.ext === 'css' || file.ext === 'doc' || 
                  file.ext === 'docx' || file.ext === 'html' || 
                  file.ext === 'js' || file.ext === 'mp3' || 
                  file.ext === 'pdf' || file.ext === 'ppt' || 
                  file.ext === 'psd' || file.ext === 'txt' || 
                  file.ext === 'xls' || file.ext === 'zip') {
            getFileIcon(file.ext).then((data) => {
                const result = 'data:image/png;base64,' + data
                setFileCode(result)
            })
        } else {
            getFileIcon('txt').then((data) => {
                const result = 'data:image/png;base64,' + data
                setFileCode(result)
            })
        }
    }, [file])
    useEffect(() => {
        getFile(file).then((data) => {
            const result = `data:${file.type};base64,` + data
            console.log(result)
            setDownloadingFileCode(result)
        })
    }, [file])
    const {divideFilename} = useWord()
    const showDetails = () => {
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
                <a className='context-menu-upload' href={downloadingFileCode} download={file.name}>Скачать</a>
                <hr />
                <p onClick={deleteFile} className='context-menu-delete'>Удалить</p>
            </div>
        )
    }
    return (
        <div onClick={showDetails} onContextMenu={(e) => openContextMenu(e)} className="file-item">
            {contextMenu}
            {file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp' ? 
            <img className='file-img' src={fileCode} alt="file" />
            :   <div>
            {file.ext === 'mp4' ? 
            <video  className='file-img' width="300" height="200" controls src={fileCode}>
            </video>
            : <div>
                {file.ext !== 'mp4' || file.ext !== 'jpg' || file.ext !== 'png' || file.ext !== 'bmp' || file.ext !== 'gif' 
            ? <img className='file-icon' src={fileCode} alt="img" />
            : <></>
            }</div>}</div>}
            
            <p className='file-title'>{divideFilename(file.name)}</p>
        </div>
    )
}

export default FileItem