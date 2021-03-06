import { useEffect, useState, useContext } from "react"
import api from '../../../auth/api/auth'
import { useParams } from "react-router"
import FilePreview from "../parts/FilePreview"
import { AuthContext } from "../../../context/AuthContext"
import useFiles from "../../../common_hooks/files.hook"

const File = () => {
    const auth = useContext(AuthContext)
    const params = useParams()
    const [file, setFile] = useState({})
    const [ready, setReady] = useState(false)
    const [fileText, setFileText] = useState('')
    useEffect(() => {
        const filePreview = async () => {
            if(file.ext === 'txt') {
                const response = await api.get(`/api/cloud/filetext/${file.name}`, {headers: {
                    Authorization: `Bearer ${auth.token}`
                }})
                setFileText(response.data.data)
            } else if(file.ext === 'doc' || file.ext === 'docx' || file.ext === 'pdf') {
                const response = await api.get(`/api/cloud/hardfiletext/${file.name}`, {headers: {
                    Authorization: `Bearer ${auth.token}`
                }})
                setFileText(response.data.text)
            } else if(file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp') {
                setFileText(<img height="400" src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name} alt="" />)
            } else if(file.ext === 'mp4' || file.ext === 'avi' || file.ext === 'mkv' || file.ext === 'dat' || file.ext === 'webm') {
                setFileText(<video width="600" height="400" controls src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name}></video>)
            } else {
                console.log('Не ну это капец')
            }
            
        }
        const getFile = async () => {
            const response = await api.get(`/api/cloud/file/${params.id}`)
            setFile(response.data.file)
            setReady(true)
            filePreview()
        }
        getFile()
    }, [params, file, auth])

    return (
        <div className="file-page">
            {ready 
            ? <div className="file-wrapper">
                {file.public || file.owner === auth.userId
                ? <div className="file">
                    <FilePreview file={file} fileText={fileText} fileOpened={true} ready={ready} />
                </div>
                : <div>
                    <h2 style={{color: 'red'}}>ERROR 404: Page not found</h2>
                </div>
                }
            </div>
            : <></>
            }
        </div>
    )
}

export default File