import '../../styles/file-item.css'
import useWord from '../../../common_hooks/divideWord.hook'

const FileItem = ({file, setSelectedFile, setDetailDisplay, setFilePreviewDisplay}) => {
    const {divideFilename} = useWord()
    const showDetails = () => {
        setSelectedFile(file)
        setDetailDisplay('flex')
        setFilePreviewDisplay('none')
    }
    return (
        <div onClick={showDetails} className="file-item">
            {file.ext === 'jpg' || file.ext === 'png' || file.ext === 'gif' || file.ext === 'bmp' ? 
            <img className='file-img' src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} alt="file" />
            :   <div>
            {file.ext === 'mp4' ? 
            <video  className='file-img' width="300" height="200" controls>
                <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/ogg; codecs="theora, vorbis"' />
                <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                <source src={require(`../../../static/userfiles/${file.owner}/${file.name}`)} type='video/webm; codecs="vp8, vorbis"'/>
            </video>
            : <div>
                {file.ext !== 'mp4' || file.ext !== 'jpg' || file.ext !== 'png' || file.ext !== 'bmp' || file.ext !== 'gif' 
            ? <img className='file-icon' src={require(`../../../static/filesicons/${file.ext}.png`)} alt="img" />
            : <></>
            }</div>}</div>}
            
            <p className='file-title'>{divideFilename(file.name)}</p>
        </div>
    )
}

export default FileItem