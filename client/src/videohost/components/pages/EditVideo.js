import {useState, useRef, useEffect} from 'react'
import useDate from '../../../common_hooks/date.hook'
import api from '../../../auth/api/auth'
import ImagePreview from '../components/ImagePreview'
import { useParams } from 'react-router'

const CreateVideo = () => {
    const params = useParams()
    const fileRef1 = useRef('')
    const {getCurrentDate} = useDate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file1, setFile1] = useState('')

    const [imageDisplay1, setImageDisplay1] = useState('none')
    const [imageUrl1, setImageUrl1] = useState('')

    useEffect(() => {
        const getChannel = async () => {
            const response = await api.get(`/api/videohost/videos/video/${params.id}`)
            const {title, description, previewUrl} = response.data.video
            setTitle(title) 
            setDescription(description)
            setImageDisplay1(process.env.REACT_APP_API_URL + '/videopreviews/' + previewUrl)
        }
        getChannel()
    }, [params])

    const emitOpen1 = () => {
        fileRef1.current.click()
    }
    const getFile1 = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImageDisplay1('block')
            setImageUrl1(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile1(file)
    }
    const send = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('date', getCurrentDate())
        formData.append('preview', file1)

        await api.post('/api/videohost/videos/create')
        window.location = '/videohost/main'
    }

    return (
        <div className='videohost-create'>
            <p className='videohost-create-title'>Редактирование видео</p>
            <input value={title} onChange={e => setTitle(e.target.value)} className='videohost-create-input' type='text' placeholder='Введите название видео' />
            <textarea value={description} onChange={e => setDescription(e.target.value)} className='videohost-create-area' placeholder='Описание к видео'></textarea>
            <input onChange={e => getFile1(e)} type="file" ref={fileRef1} />
            <button onClick={e => emitOpen1(e)} className="videohost-create-empty-button">Загрузить превью</button>
            <ImagePreview imageDisplay={imageDisplay1} imageUrl={imageUrl1} />
            <button onClick={send} className='videohost-create-button'>Обновить видео</button>
        </div>
    )
}

export default CreateVideo