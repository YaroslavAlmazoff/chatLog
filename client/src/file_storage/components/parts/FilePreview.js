const FilePreview = ({file, filePreviewDisplay, fileText, fileOpened, ready}) => {
    return (
        <div className='file-preview' style={{display: filePreviewDisplay}}>
                {ready && fileOpened ?<div className="file-opened-info">
                    <h2 className="file-opened-preview-name" style={file.ext === 'doc' || file.ext === 'docx' || file.ext === 'txt' || file.ext === 'pdf'?{color: 'black'}:{color: 'white'}}>{file.name}</h2>
                    <a className='button open-download-link' href={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name} download={file.name}>Скачать</a>
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
                <video width="300" height="200" controls src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name}>
                </video>    : <></>
                }
                {file.ext === 'mp3' ? 
                <audio controls src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name}></audio>   : <></>
                }
                {file.ext === 'pdf' ? <iframe title={file.name} src={process.env.REACT_APP_API_URL + `/userfiles/${file.owner}/` + file.name} style={{width: '100%', height: '100%'}}></iframe> : <></>}
            </div>
    )
}

export default FilePreview