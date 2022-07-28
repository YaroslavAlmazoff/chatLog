import {useState, useRef} from 'react'
import useDate from '../../../common_hooks/date.hook'
import api from '../../../auth/api/auth'
import ImagePreview from '../components/ImagePreview'
import VideoPreview from '../components/VideoPreview'
import '../../styles/form.css'

const CreateVideo = () => {
    const fileRef1 = useRef('')
    const fileRef2 = useRef('')
    const {getCurrentDate} = useDate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file1, setFile1] = useState('')
    const [file2, setFile2] = useState('')

    const [imageDisplay1, setImageDisplay1] = useState('none')
    const [imageUrl1, setImageUrl1] = useState('')
    const [imageDisplay2, setImageDisplay2] = useState('none')
    const [imageUrl2, setImageUrl2] = useState('')

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
    const emitOpen2 = () => {
        fileRef2.current.click()
    }
    const getFile2 = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImageDisplay2('block')
            setImageUrl2(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile2(file)
    }

    const send = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('date', getCurrentDate())
        formData.append('preview', file1)
        formData.append('video', file2)

        await api.post('/api/videohost/videos/create')
        window.location = '/videohost/main'
    }

    return (
        <div className='videohost-create'>
            <p className='videohost-create-title'>Создание видео</p>
            <input value={title} onChange={e => setTitle(e.target.value)} className='videohost-create-input' type='text' placeholder='Введите название видео' />
            <textarea value={description} onChange={e => setDescription(e.target.value)} className='videohost-create-area' placeholder='Описание к видео'></textarea>
            <input onChange={e => getFile1(e)} type="file" ref={fileRef1} />
            <button onClick={e => emitOpen1(e)} className="videohost-create-empty-button">Загрузить превью</button>
            <ImagePreview imageDisplay={imageDisplay1} imageUrl={imageUrl1} />
            <input onChange={e => getFile2(e)} type="file" ref={fileRef2} />
            <button onClick={e => emitOpen2(e)} className="videohost-create-empty-button">Загрузить видео</button>
            <VideoPreview videoDisplay={imageDisplay2} videoUrl={imageUrl2} />
            <button onClick={send} className='videohost-create-button'>Создать видео</button>
        </div>
    )
}

export default CreateVideo