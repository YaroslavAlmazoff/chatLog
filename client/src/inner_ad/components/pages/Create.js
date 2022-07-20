import {useRef, useState, useContext} from 'react'
import useDate from '../../../common_hooks/date.hook'
import api from '../../../auth/api/auth'
import ImagePreview from '../components/ImagePreview'
import { AuthContext } from '../../../context/AuthContext'
import '../../styles/form.css'

const Create = () => {
    const auth = useContext(AuthContext)
    const {getCurrentDate} = useDate()
    const fileRef = useRef()
    const [imageDisplay, setImageDisplay] = useState('none')
    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [text, setText] = useState('')
    const [file, setFile] = useState('')
    const [live, setLive] = useState(1)
    const [errorText, setErrorText] = useState('')

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
        if(link){if(!link.includes('http')) {
            setErrorText('Неверный формат. Пример правильной ссылки: http://chatlog.ru')
            return
        }}
        const date = getCurrentDate()

        let dieDate = toString(Number(date.split('.')[0]) + Number(live)) + '.' + date.split('.')[1] + '.' + date.split('.')[2]
        if(dieDate.split('.')[0] > 28) {
            dieDate = dieDate.split('.')[0] - 28 + '.' + Number(date.split('.')[1]) + 1 + '.' + date.split('.')[2]
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('text', text)
        formData.append('file', file)
        formData.append('date', date)
        formData.append('link', link)
        formData.append('dieDate', dieDate)
        console.log(link)

        await api.post(`/api/innerad/create/${auth.userId}`, formData, {headers: 
            {'Content-Type': 'multipart/form-data'}
        })
        window.location = `/home`
    }

    return (
        <div className="create-ad-page">
            <p className="create-ad-page-title">Создание рекламной карточки</p>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="Название..." className='create-ad-page-input' />
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Подробнее..." className="create-ad-page-area"></textarea>
            <input onChange={e => getFile(e)} type="file" ref={fileRef} />
            <button onClick={e => emitOpen(e)} className="create-ad-page-button">Загрузить изображение</button>
            <p style={{color: 'red'}}>{errorText}</p>
            <input value={link} onChange={e => setLink(e.target.value)} type="text" placeholder="Ссылка на сайт" className='create-ad-page-input' />
            <p className='create-ad-page-title' style={{fontSize: '11pt', color:'lightgreen'}}>Если ссылка на сайт не указана, для Вашей рекламы будет создана отдельная страница в ChatLog.ru </p>
            <input value={live} onChange={e => setLive(e.target.value)} type="number" placeholder="Время жизни" className='create-ad-page-input' /><p className='create-ad-page-title' style={{fontSize: '11pt', color:'lightgreen'}}>дней</p>
            <div style={{marginTop: '10px', marginBottom: '10px'}}>
                <ImagePreview imageDisplay={imageDisplay} imageUrl={imageUrl} />
            </div>
            <button onClick={send} className="create-ad-page-button" >Разместить рекламу</button>
        </div>
    )
}

export default Create