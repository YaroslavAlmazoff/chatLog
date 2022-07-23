import Categories from "./components/Categories"
import {useState} from 'react'
import '../styles/main.css'

const Head = ({searchValue, setSearchValue}) => {
    const [categoriesDisplay, setCategoriesDisplay] = useState('none')

    const showCategories = () => {
        setCategoriesDisplay('flex')
    }
    const goCreate = () => {
        window.location = ''
    }

    return (
        <div className="ads-main-head">
            <div className="ads-main-head-top">
                <p className="ads-main-title">ChatLog Объявления</p>
                <input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="search" className="ads-main-input" placeholder="Поиск..." />
            </div>
            <div className="ads-main-buttons">
                <button onClick={showCategories} className="ads-main-button">Категории</button>
                <button onClick={goCreate} className="ads-main-button">Разместить</button>
            </div>
            <Categories display={categoriesDisplay} />
        </div>
    )
}

export default Head