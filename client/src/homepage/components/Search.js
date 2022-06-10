import { useState } from "react"
import './styles/search.css'


const Search = () => {
    const [question, setQuestion] = useState('')

    const find = () => {
        const searchArr = question.split(' ')
        let str = ''
        for(let word of searchArr) {
            word = word + '+'
            str = str + word
        }
        const searchStr = `https://www.yandex.ru/search/?text=${str}&lr=225`
        console.log(searchStr)
        window.location = searchStr
    }

    return (
        <div className="home-search">
            <input placeholder="Найти что-нибудь в Интернете..." className="search-field" type='search' value={question} onChange={(e) => setQuestion(e.target.value)}/>
            <button onClick={find} className="search-btn">Найти</button>
        </div>
    )
}

export default Search