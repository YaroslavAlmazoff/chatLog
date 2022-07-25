import Categories from "./components/Categories"
import {useState} from 'react'
import '../styles/main.css'

const Head = ({searchValue, setSearchValue}) => {
    const [categoriesDisplay, setCategoriesDisplay] = useState('none')

    const showCategories = () => {
        if(categoriesDisplay === 'none') {
            setCategoriesDisplay('flex')
        } else {
            setCategoriesDisplay('none')
        }
        
    }
    const goCreate = () => {
        window.location = '/ad/create'
    }
    const select = (el) => {
        window.location = `/ad/category/${el}`
    }
    const search = () => {
        window.location = `/ad/search`
    }

    return (
        <div className="ads-main-head">
            <div className="ads-main-head-top">
                <p className="ads-main-title">ChatLog Объявления</p>
                <button onClick={search} className="ads-main-button">Поиск объявлений</button>
            </div>
            <div className="ads-main-buttons">
                <button onClick={showCategories} className="ads-main-button">Категории</button>
                <button onClick={goCreate} className="ads-main-button">Разместить</button>
            </div>
            <Categories display={categoriesDisplay} select={select} />
        </div>
    )
}

export default Head