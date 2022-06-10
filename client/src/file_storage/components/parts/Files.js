import FileItem from "./FileItem"
import '../../styles/files.css'
import { useRef, useContext } from "react"
import api from '../../../auth/api/auth'
import { AuthContext } from "../../../context/AuthContext"

const Files = ({files, setFiles, setSelectedFile, setDetailDisplay, setFilePreviewDisplay}) => {
    const auth = useContext(AuthContext)
    const fileRef = useRef()
    const emitOpen = () => {
        fileRef.current.click()
    }
    const getFile = async (e) => {
        let file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        //Загрузка файла в состояние
        const response = await api.post('/api/cloud/upload', formData, {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        const response2 = await api.get('/api/cloud/files', {headers: {
            Authorization: `Bearer ${auth.token}`
        }})
        setFiles(response2.data.files)
    }
    return (
        <div className="files">
            <div className="files-head">
                <h2 className="files-head-title">Файловое хранилище</h2>
                <input onChange={getFile} ref={fileRef} type='file' />
                <button onClick={emitOpen} className="upload-new-file">Загрузить новый файл</button>
            </div>
            <div className="files-body">
                <div className="files-list">
                    {files.map(el => <FileItem key={Math.random()} 
                        setSelectedFile={setSelectedFile} 
                        setDetailDisplay={setDetailDisplay} 
                        setFilePreviewDisplay={setFilePreviewDisplay} 
                        file={el} 
                    />)}
                </div>
            </div>
        </div>
    )
}

export default Files