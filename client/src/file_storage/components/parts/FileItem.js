import '../../styles/file-item.css'
import useWord from '../../../common_hooks/divideWord.hook'
import useFiles from '../../../common_hooks/files.hook'
import { useState, useEffect } from 'react'

const FileItem = ({file, setSelectedFile, setDetailDisplay, setFilePreviewDisplay}) => {
    const {getFile} = useFiles()
    const [fileCode, setFileCode] = useState('')
    useEffect(() => {
        getFile(file).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            setFileCode(result)
        })
    }, [file])
    const {divideFilename} = useWord()
    const showDetails = () => {
        setSelectedFile(file)
        setDetailDisplay('flex')
        setFilePreviewDisplay('none')
    }
    return (
        <div onClick={showDetails} className="file-item">
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