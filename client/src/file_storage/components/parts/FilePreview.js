import { useEffect } from "react"

const FilePreview = ({file, filePreviewDisplay, fileText, fileOpened, ready}) => {
    useEffect(() => {
        console.log(file)
    })
    return (
        <div className='file-preview' style={{display: filePreviewDisplay}}>
                {ready && fileOpened ?<div className="file-opened-info">
                    <h2 className="file-opened-preview-name">{file.name}</h2>
                    <a className='button download-link' href={require(`../../../static/userfiles/${file.owner}/${file.name}`)} download>Скачать</a>
                    </div>:<></>}
                {file.ext === 'txt' || file.ext === 'doc' || file.ext === 'docx'
                ?  <p className='file-preview-text'>{fileText}</p>
                : <></>
                } 
                {file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp'
                ? <div className='file-img-dark-wrapper'>{fileText}</div>
                : <></>
                }  
            </div>
    )
}

export default FilePreview