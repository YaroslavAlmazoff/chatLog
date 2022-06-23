import { useEffect, useState } from "react"
import useFiles from "../../../common_hooks/files.hook"

const FilePreview = ({file, filePreviewDisplay, fileText, fileOpened, ready}) => {
    const {getFile} = useFiles()
    const [fileCode, setFileCode] = useState('')
    useEffect(() => {
        getFile(file).then((data) => {
            const result = `data:${file.type};base64,` + data
            setFileCode(result)
        })
    }, [file])
    return (
        <div className='file-preview' style={{display: filePreviewDisplay}}>
                {ready && fileOpened ?<div className="file-opened-info">
                    <h2 className="file-opened-preview-name" style={file.ext === 'doc' || file.ext === 'docx' || file.ext === 'txt' || file.ext === 'pdf'?{color: 'black'}:{color: 'white'}}>{file.name}</h2>
                    <a className='button download-link' href={fileCode} download={file.name}>Скачать</a>
                    </div>:<></>}
                {file.ext === 'txt' || file.ext === 'doc' || file.ext === 'docx'
                ?  <div><br /><br /><p className='file-preview-text'>{fileText}</p></div>
                : <></>
                } 
                {file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp'
                ? <div className='file-img-dark-wrapper'>{fileText}</div>
                : <></>
                }  
                {file.ext === 'mp4' ? 
                <video width="300" height="200" controls src={fileCode}>
                </video>    : <></>
            }
            </div>
    )
}

export default FilePreview