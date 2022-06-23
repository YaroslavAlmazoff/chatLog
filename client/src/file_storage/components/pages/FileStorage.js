import {useEffect, useState, useContext} from 'react'
import Files from '../parts/Files'
import FileDetail from '../parts/FileDetail'
import '../../styles/file-storage.css'
import api from '../../../auth/api/auth'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../common_components/Loader'

const FileStorage = () => {
    const auth = useContext(AuthContext)
    const [files, setFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState({})
    const [detailDisplay, setDetailDisplay] = useState('none')
    const [downloadingFile, setDownloadingFile] = useState(require('../../../static/useravatars/user.png'))
    const [filePreviewDisplay, setFilePreviewDisplay] = useState('none')
    const [filesLoading, setFilesLoading] = useState(false)
    useEffect(() => {
        setFilesLoading(true)
        const getFiles =  async () => {
            const response = await api.get(`/api/cloud/files`, {headers: {
                Authorization: `Bearer ${auth.token}`
            }})
            setFiles(response.data.files)
            setFilesLoading(false)
        }
        getFiles()
    }, [auth])
    return (
        <div className='file-storage'>
            {!filesLoading ? <Files
                setFilePreviewDisplay={setFilePreviewDisplay} 
                setSelectedFile={setSelectedFile} 
                files={files} setFiles={setFiles} 
                setDetailDisplay={setDetailDisplay} 
            /> : <Loader ml={'50%'} />}
            <div className='file-detail-wrapper'><FileDetail 
                setFiles={setFiles} 
                downloadingFile={downloadingFile}
                setDownloadingFile={setDownloadingFile} 
                file={selectedFile} 
                detailDisplay={detailDisplay}
                filePreviewDisplay={filePreviewDisplay} 
                setFilePreviewDisplay={setFilePreviewDisplay}
            />
            <div className='file-empty-element'></div>
        </div>
        </div>
    )
}

export default FileStorage