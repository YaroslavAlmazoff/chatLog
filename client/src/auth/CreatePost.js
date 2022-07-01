import ImagePreview1 from "./parts/ImagePreview1"
import VideoPreview from "./parts/VideoPreview"
import { useState, useRef } from "react" 
import usePosts from "./hooks/usePosts"
import useDate from "../common_hooks/date.hook"
import { useParams } from "react-router"
import "./styles/create-post.css"
import { smiles } from "../messenger/components/pages/smiles"
import Smile from "../messenger/components/parts/Smile"

const CreatePost = () => {
    const params = useParams()
    const {send} = usePosts()
    const {getCurrentDate} = useDate()
    const [articleTitle, setArticleTitle] = useState('Напишите что-нибудь...')
    const [imagePreviewDisplay1, setImagePreviewDisplay1] = useState('none')
    const [imagePreviewUrl1, setImagePreviewUrl1] = useState('')
    const [videoPreviewUrl, setVideoPreviewUrl] = useState('')
    const [videoPreviewDisplay, setVideoPreviewDisplay] = useState('none')
    const [userPosts, setUserPosts] = useState([])
    const [userVideos, setUserVideos] = useState([])
    const [file, setFile] = useState('')
    const [smilesDisplay, setSmilesDisplay] = useState('none')
    //Создание ссылок на файловые поля ввода
    const fileRef = useRef()
    //Получение файла изображения поста пользователя
    const getFile = async (e) => {
        let file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {    
            if(file.type === 'image/jpeg' || file.type === 'image/png') {
                setImagePreviewDisplay1('block')  
                setImagePreviewUrl1(ev.target.result)
            } else {
                setVideoPreviewDisplay('block')  
                setVideoPreviewUrl(ev.target.result)
            }
            
        }
        reader.readAsDataURL(file)
        //Загрузка файла в состояние
        setFile(file)
    }
    //Эмитирование открытия загрузки файла изображения для поста
    const emitOpen = () => {
        fileRef.current.click()
    }
    const addSmile = (code) => {
        setArticleTitle((prev) => prev + code)
    }
    const showSmiles = () => {
        if(smilesDisplay === 'none') {
            setSmilesDisplay('block')
            setTimeout(() => {
                setSmilesDisplay('none')
            }, 10000)
        } else {
            setSmilesDisplay('none')
        }
        console.log('sesh')
    }

    return (
        <div className="create-post">
            <div className="room-smiles" style={{display: smilesDisplay}}>
                        {smiles.map(el => <Smile key={el.code} el={el} addSmile={addSmile} />)}
            </div>
            <input onChange={(e) => getFile(e)} ref={fileRef} type="file" accept=".jpg, .png, .gif .mp4" />
            <input className="post-field" type="text" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} />
            <img onClick={showSmiles} className="upload-image" src={require(`../messenger/img/smile.png`)} alt='img'/>
            <button onClick={(e) => emitOpen(e)} className="user-add-foto">Выбрать фото</button>
            <button onClick={() => send(getCurrentDate, articleTitle, file, params, setArticleTitle, setUserPosts, userPosts, userVideos, setUserVideos)} className="user-add-post">Добавить запись</button>
            {file.type === 'image/jpeg' || file.type === 'image/png'
            ? <ImagePreview1 imagePreviewUrl1={imagePreviewUrl1} imagePreviewDisplay1={imagePreviewDisplay1} />
            : <VideoPreview videoPreviewDisplay={videoPreviewDisplay} videoPreviewUrl={videoPreviewUrl} />
    }         
        </div>
    )
}

export default CreatePost