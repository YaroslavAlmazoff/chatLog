import { useContext, useState, useRef } from "react"
import useDate from "../../common_hooks/date.hook"
import { AuthContext } from "../../context/AuthContext"
import Categories from "../components/components/Categories"
import ImagePreview from "../components/ImagePreview"
import '../styles/form.css'

const CreateAd = () => {
    const fileRef = useRef()
    const {getCurrentDate} = useDate()
    const auth = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [description, setDesctiption] = useState('')
    const [price, setPrice] = useState(0)
    const [city, setCity] = useState('')
    const [category, setCategory] = useState('')
    const [live, setLive] = useState(0)
    const [categoriesDisplay, setCategoriesDisplay] = useState('none')
    const [phone, setPhone] = useState('')
    const [files, setFiles] = useState(null)
    const [imageDisplay, setImageDisplay] = useState('none')
    const [imageUrl, setImageUrl] = useState('')

    const emitOpen = () => {
        fileRef.current.click()
    }
    const getFile = async (e) => {
        let files = e.target.files
        console.log(files)
        /*const reader = new FileReader()
        reader.onload = ev => {
            setImageDisplay('block')
            setImageUrl(ev.target.result)
        }
        reader.readAsDataURL(file)
        setFile(file)*/
    }


    const send = async () => {
        const date = getCurrentDate()
        const formData = new FormData()
        let dieDate = Number(date.split('.')[0]) + Number(live) + '.' + date.split('.')[1] + '.' + date.split('.')[2]
        if(dieDate.split('.')[0] > 28) {
            dieDate = dieDate.split('.')[0] - 28 + '.' + Number(date.split('.')[1]) + 1 + '.' + date.split('.')[2]
        }

        formData.append('title', title)
        formData.append('description', description)
        formData.append('date', date)
        formData.append('dieDate', dieDate)
        formData.append('price', price)
        formData.append('city', city)
        formData.append('category', category)
        formData.append('phone', phone)
        formData.append('user', auth.userId)

        window.location = '/ads/new'
    }
    const showCategories = () => {
        setCategoriesDisplay('flex')
    }
    const select = (el) => {
        setCategory(el)
    }

    return (
        <div className="ad-form">
            <p className="ad-form-title">Размещение объявления</p>
            <input className="ad-form-input" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Название объявления" />
            <textarea className="ad-form-area" value={description} onChange={e => setDesctiption(e.target.value)} placeholder="Название объявления"></textarea>
            <button className="ad-form-button">Загрузить изображения</button>
            <p className="ad-form-parameter">Стоимость: <input className="ad-form-input" type="text" value={price} onChange={e => setPrice(e.target.value)} />&#8381;</p>
            <p className="ad-form-parameter">Город: <input className="ad-form-input" type="text" value={city} onChange={e => setCity(e.target.value)} /></p>
            <p className="ad-form-parameter">Время существования: <input className="ad-form-input" type="text" value={live} onChange={e => setLive(e.target.value)} />дней</p>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Номер телефона" />
            <input onChange={e => getFile(e)} type="file" ref={fileRef} multiple />
            <button onClick={e => emitOpen(e)} className="ad-form-button">Загрузить изображения</button>
            <div>
                
            </div>
            <button onClick={showCategories} className="ad-form-select">Выбрать категорию</button>
            <Categories display={categoriesDisplay} select={select} />
            <button className="ad-form-button" onClick={send}>Разместить</button>
        </div>
    )
}

export default CreateAd