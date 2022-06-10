import React from "react"
import "./styles/search.css"

const Search = ({searchValue, setSearchValue}) => {
    //Компонент поиска
    return (     
        <div className="search">
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" className="search-field"/>
        </div>

    )
}

export default Search