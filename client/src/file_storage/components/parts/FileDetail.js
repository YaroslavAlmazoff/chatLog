import '../../styles/file-detail.css'
import useFileSize from '../../hooks/FileSize.hook'
import useWord from '../../../common_hooks/divideWord.hook'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'
import { useContext, useState } from 'react'
import FilePreview from './FilePreview'
import { useNavigate } from 'react-router'

const FileDetail = ({file, setFiles, detailDisplay, downloadingFile, 
                    setDownloadingFile, filePreviewDisplay, setFilePreviewDisplay}) => {
    const navigate = useNavigate()
    const [fileText, setFileText] = useState('')
    const auth = useContext(AuthContext)
    const {divideFilename} = useWord()
    const {fileSize} = useFileSize()
    const filePreview = async () => {
        if(file.ext === 'txt') {
            const response = await api.get(`/api/cloud/filetext/${file.name}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            setFileText(response.data.data)
            setFilePreviewDisplay('block')
        } else if(file.ext === 'doc' || file.ext === 'docx' || file.ext === 'pdf') {
            const response = await api.get(`/api/cloud/hardfiletext/${file.name}`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            setFileText(response.data.text)
            setFilePreviewDisplay('block')
        } else if(file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp') {
            setFileText(<img height="200" src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} alt="" />)
            setFilePreviewDisplay('block')
        } else if(file.ext === 'mp4' || file.ext === 'avi' || file.ext === 'mkv' || file.ext === 'dat' || file.ext === 'webm') {
            setFileText(<video width="300" height="200" controls>
            <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/ogg; codecs="theora, vorbis"' />
            <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
            <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/webm; codecs="vp8, vorbis"'/>
        </video>)
        } else {
            console.log('Не ну это капец')
        }
        
    }
    const openFile = async () => {
        navigate(`/cloud/file/${file._id}`)
    }
    const downloadFile = () => {
        setDownloadingFile(require(`../../../static/userfiles/${file.owner}/${file.name}`))
    }
    const sendFile = () => {
        
    }
    const sendFileLink = () => {
        
    }
    const deleteFile = async () => {
        const response = await api.get(`/api/cloud/delete/${file.name}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        setFiles(response.data.files)
    }
    return (
        <div className="file-detail" style={{display: detailDisplay}}>
            <table className='file-table'>
                <thead className='file-table-head'>
                    <th className='file-table-head-title'>Имя</th>
                    <th className='file-table-head-title'>Тип</th>
                    <th className='file-table-head-title'>Размер</th>
                </thead>
                <tbody className='file-table-body'>
                    <tr className='file-table-row'>
                        <td className='file-info'>{divideFilename(file.name, 20)}</td>
                        <td className='file-info'>{file.type}</td>
                        <td className='file-info'>{fileSize(file.size)}</td>
                    </tr>
                </tbody>
            </table>
            <div className='file-actions'>
                <button onClick={sendFileLink} className='button button-blue'>Отправить ссылку на файл</button>
                <button onClick={sendFile} className='button button-blue'>Отправить файл</button>
                <button onClick={filePreview} className='button button-blue'>Предпросмотр файла</button>
                <button onClick={openFile} className='button button-blue'>Открыть файл</button>
                <a onClick={downloadFile} className='button download-link' href={downloadingFile} download>Скачать</a>
                <button onClick={deleteFile} className='button button-red'>Удалить</button>
            </div>
            <FilePreview file={file} fileText={fileText} filePreviewDisplay={filePreviewDisplay} ready={false} fileOpened={false} />
        </div>
    )
}

export default FileDetail