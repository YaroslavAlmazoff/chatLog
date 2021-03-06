import {useState, useRef, useContext} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import api from '../../../auth/api/auth'
import '../../styles/form.css'

const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [pubName, setPubName] = useState('')
    const [pubDescription, setPubDescription] = useState('')

    //Получение ссылок на файловые поля ввода
    const fileRef = useRef()
    const fileRef2 = useRef()
    //Инициализация состояния для изображений предпросмотра аватарки и баннера
    const [file, setFile] = useState('')
    const [file2, setFile2] = useState('')
    //Инициализация состояний дисплея и url изображений предпросмотра аватарки и баннера
    const [imagePreviewDisplay1, setImagePreviewDisplay1] = useState('none')
    const [imagePreviewUrl1, setImagePreviewUrl1] = useState('')
    const [imagePreviewDisplay2, setImagePreviewDisplay2] = useState('none')
    const [imagePreviewUrl2, setImagePreviewUrl2] = useState('')

    //Эмитирование открытия загрузки изображения для аватарки
    const emitOpen = () => {
        fileRef.current.click()
    }
    //Эмитирование открытия загрузки изображения для баннера
    const emitOpen2 = () => {
        fileRef2.current.click()
    }
    //Получение изображения для аватарки
    const getFile = async (e) => {
        let file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = ev => {
            setImagePreviewDisplay1('block')
            setImagePreviewUrl1(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile(file)
    }
    //Получение изображения для баннера
    const getFile2 = async (e) => {
        let file = e.target.files[0]
        console.log(file)
        const reader = new FileReader()
        reader.onload = ev => {
            setImagePreviewDisplay2('block')
            setImagePreviewUrl2(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile2(file)
    }

    const createPublic = async () => {
        //Инициализация formdata для загрузки на сервер изображений
        const formData = new FormData()
        //Добавление информацию о пользователе в formdata
        formData.append('name', pubName)
        formData.append('description', pubDescription)
        formData.append('file', file)
        formData.append('file2', file2)
        //Отправка запроса на обновление профиля
        await api.post(`/api/public/create`, formData, {headers: 
            {'Content-Type': 'multipart/form-data', 
            Authorization: `Bearer ${auth.token}`}
        })
        
        //Перемещение на профиль пользователя
        window.location = `/publics`
    }

    return (
        <div className="create-public">
            <div className="create-public-form">
                <p style={{color: 'white'}}>Создать группу</p>
                <input className='create-public-input' type="text" value={pubName} onChange={(e) => setPubName(e.target.value)} placeholder="Введите название группы" />
                <textarea className='create-public-area' value={pubDescription} onChange={(e) => setPubDescription(e.target.value)} placeholder='Введите описание'></textarea>
                <input onChange={(e) => getFile(e)} ref={fileRef} type="file"  />
                <input onChange={(e) => getFile2(e)} ref={fileRef2} type="file"  />
                <div className='create-public-upload-field'>
                    <button onClick={(e) => emitOpen(e)} className='create-public-button'>Выберите аватарку</button>
                    <p>Preview</p>
                </div>
                <div className='create-public-upload-field'>
                    <button onClick={(e) => emitOpen2(e)} className='create-public-button'>Выберите баннер</button>
                    <p>Preview</p>
                </div>
                <button className='create-public-button' onClick={createPublic}>Создать группу</button>
            </div>
        </div>
    )
}

export default CreatePage