import '../../styles/file-item.css'
import useWord from '../../../common_hooks/divideWord.hook'
import useFiles from '../../../common_hooks/files.hook'
import { useState, useEffect } from 'react'

const FileItem = ({file, setSelectedFile, setDetailDisplay, setFilePreviewDisplay}) => {
    const {getFileIcon, getFile} = useFiles()
    const [fileCode, setFileCode] = useState('')
    const [contextMenu, setContextMenu] = useState(null)
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
    const {divideFilename} = useWord()
    const showDetails = () => {
        setSelectedFile(file)
        setDetailDisplay('flex')
        setFilePreviewDisplay('none')
    }
    const openContextMenu = (e) => {
        e.preventDefault()
        setContextMenu(
            <div style={{position: 'absolute', marginLeft: e.pageX + 'px', top: e.pageY + 'px'}}>
                <p>My context menu</p>
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