import {useRef, useState} from 'react'
import useDate from '../../../common_hooks/date.hook'
import ImagePreview from '../components/ImagePreview'
import api from '../../../auth/api/auth'
import {useParams} from 'react-router'

const CreatePostPage = () => {
    const params = useParams()
    const {getCurrentDate} = useDate()
    const fileRef = useRef()
    const [imageDisplay, setImageDisplay] = useState('none')
    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState('')

    const emitOpen = () => {
        fileRef.current.click()
    }
    const getFile = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImageDisplay('block')
            setImageUrl(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile(file)
    }

    const send = async () => {
        if(!file) return
        const date = getCurrentDate()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('text', text)
        formData.append('file', file)
        formData.append('date', date)

        await api.post(`/api/public/createpost/${params.id}`, formData, {headers: 
            {'Content-Type': 'multipart/form-data'}
        })
        window.location = `/public/${params.id}`
    }

    return (
        <div className="create-article-page">
            <p className="create-article-page-title">Создание статьи</p>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Название статьи" />
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Ваша статья" className="create-article-page-area"></textarea>
            <input onChange={e => getFile(e)} type="file" ref={fileRef} />
            <button onClick={e => emitOpen(e)} className="create-article-page-button">Загрузить изображение</button>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <ImagePreview imageDisplay={imageDisplay} imageUrl={imageUrl} />
            </div>
            <button onClick={send} className="create-article-page-button" >Опубликовать</button>
        </div>
    )
}

export default CreatePostPage