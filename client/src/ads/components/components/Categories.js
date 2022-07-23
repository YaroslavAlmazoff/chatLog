import { useState } from "react"
import '../../styles/main.css'

const Categories = ({display, select}) => {
    const [categories] = useState([
        'Услуги', 'Транспорт', 'Электроника', 'Бытовая техника', 'Недвижимость', 'Животные или растения'
    ])


    return (
        <div className="ads-main-categories" style={{display}}>
            {categories.map(el => <p onClick={() => select(el)} className="ads-main-category">{el}</p>)}
        </div>
    )
}

export default Categories