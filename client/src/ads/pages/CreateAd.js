import { useContext, useState, useRef } from "react"
import useDate from "../../common_hooks/date.hook"
import { AuthContext } from "../../context/AuthContext"
import Categories from "../components/components/Categories"
import ImagePreview from "../components/ImagePreview"
import api from '../../auth/api/auth'
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
    const [files, setFiles] = useState([])
    const [filesData, setFilesData] = useState([])
    const [imageDisplay, setImageDisplay] = useState('none')

    const emitOpen = () => {
        fileRef.current.click()
    }
    const getFile = async (e) => {
        let fileList = e.target.files
        const files = Array.from(fileList)
        files.forEach(el => {
            const reader = new FileReader()
            console.log(el)
            reader.onload = ev => {
                setFilesData(prev => [...prev, ev.target.result])
                setImageDisplay('block')
            }
            reader.readAsDataURL(el)
        })
        setFiles(files)
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

        files.forEach((el, index) => {
            formData.append(`file${index}`, el)
        })

        const response = await api.post('/api/ad/create', formData)
        console.log(response.data.files)
        window.location = '/ad/main'
    }
    const showCategories = () => {
        setCategoriesDisplay('flex')
    }
    const select = (el) => {
        setCategory(el)
    }

    return (
        <div className="ad-form">
            <p className="ad-form-title">???????????????????? ????????????????????</p>
            <input className="ad-form-main-input" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="???????????????? ????????????????????" />
            <textarea className="ad-form-area" value={description} onChange={e => setDesctiption(e.target.value)} placeholder="??????????????????"></textarea>
            <p className="ad-form-parameter">??????????????????: <input className="ad-form-input" type="text" value={price} onChange={e => setPrice(e.target.value)} />&#8381;</p>
            <p className="ad-form-parameter">??????????: <input className="ad-form-input" type="text" value={city} onChange={e => setCity(e.target.value)} /></p>
            <p className="ad-form-parameter">?????????? ??????????: <input className="ad-form-input" type="text" value={live} onChange={e => setLive(e.target.value)} />????????</p>
            <input className="ad-form-input" type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="?????????? ????????????????" />
            <input onChange={e => getFile(e)} type="file" ref={fileRef} multiple />
            <button onClick={e => emitOpen(e)} className="ad-form-button">?????????????????? ??????????????????????</button>
            <div className="ad-form-images-list" style={{display: imageDisplay}}>
                {filesData.map(imageUrl => <ImagePreview imageUrl={imageUrl} />)}
            </div>
            <button onClick={showCategories} className="ad-form-select">?????????????? ??????????????????</button>
            <Categories display={categoriesDisplay} select={select} />
            <button className="ad-form-button" onClick={send}>????????????????????</button>
        </div>
    )
}

export default CreateAd