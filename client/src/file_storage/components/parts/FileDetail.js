import '../../styles/file-detail.css'
import useFileSize from '../../hooks/FileSize.hook'
import useWord from '../../../common_hooks/divideWord.hook'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'
import { useContext, useState } from 'react'
import FilePreview from './FilePreview'
import { useNavigate } from 'react-router'
import useFiles from '../../../common_hooks/files.hook'
import {useEffect} from 'react'
import LinkRecipientsList from './LinkRecipientsList'
import RecipientsList from './RecipientsList'
import Loader from '../../../common_components/Loader'

const FileDetail = ({file, detailDisplay, downloadingFile, 
                    setDownloadingFile, filePreviewDisplay, setFilePreviewDisplay}) => {
    const {getFile, getFileToDownload} = useFiles()
    const [fileCode, setFileCode] = useState('')
    const [linkRecipientsDisplay, setLinkRecipientsDisplay] = useState('none')
    const [recipientsDisplay, setRecipientsDisplay] = useState('none')
    const [fileLoading, setFileLoading] = useState(false)
    const [fileText, setFileText] = useState('')
    useEffect(() => {
        setFileLoading(true)
        console.log(file)
        getFile(file).then((data) => {
            if(file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp') {
                const result = 'data:image/jpeg;base64,' + data
                setFileCode(result)
                setFileLoading(false)
            }
            else if(file.ext === 'avi' || file.ext === 'mp4') {
                const result = 'data:video/mp4;base64,' + data
                setFileCode(result)
                setFileLoading(false)
            }
        }, [])
        getFileToDownload(file).then((data) => {
            if(file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp') {
                const result = 'data:image/jpeg;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'avi' || file.ext === 'mp4') {
                const result = 'data:video/mp4;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'mp3') {
                const result = 'data:audio/mp3;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'pdf') {
                const result = 'data:application/pdf;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'doc') {
                const result = 'data:application/msword;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'docx') {
                const result = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
            else if(file.ext === 'txt') {
                const result = 'data:text/plain;base64,' + data
                setDownloadingFile(result)
                setFileLoading(false)
            }
        })
        
    }, [file])
    const navigate = useNavigate()
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
            setFileText(<img style={{height: '100%'}} src={fileCode} alt="" />)
            setFilePreviewDisplay('block')
        } else if(file.ext === 'mp4' || file.ext === 'avi' || file.ext === 'mkv' || file.ext === 'dat' || file.ext === 'webm') {
            setFileText(<video width="300" height="200" controls src={fileCode}>
        </video>)
        } else {
            console.log(file.ext)
            console.log('Не ну это капец')
        }
        
    }
    const openFile = async () => {
        navigate(`/cloud/file/${file._id}`)
    }
    const sendFile = () => {
        setRecipientsDisplay('block')
    }
    const sendFileLink = () => {
        setLinkRecipientsDisplay('block')
    }
    const deleteFile = async () => {
        await api.get(`/api/cloud/delete/${file.name}`, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        window.location.reload()
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
            {!fileLoading ? <div className='file-actions'>
                <button onClick={sendFileLink} className='button button-blue'>Отправить ссылку на файл</button>
                <button onClick={sendFile} className='button button-blue'>Отправить файл</button>
                <button onClick={filePreview} className='button button-blue'>Предпросмотр файла</button>
                <button onClick={openFile} className='button button-blue'>Открыть файл</button>
                <a className='button download-link' href={downloadingFile} download={file.name}>Скачать</a>
                <button onClick={deleteFile} className='button button-red'>Удалить</button>
            </div> : <Loader ml={'50%'} />}
            <FilePreview file={file} fileText={fileText} filePreviewDisplay={filePreviewDisplay} ready={false} fileOpened={false} />
            <LinkRecipientsList file={file} linkRecipientsDisplay={linkRecipientsDisplay} />
            <RecipientsList file={file} recipientsDisplay={recipientsDisplay} />
        </div>
    )
}

export default FileDetail