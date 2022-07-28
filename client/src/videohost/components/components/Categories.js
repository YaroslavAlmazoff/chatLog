import { useState } from "react"

const Categories = ({display, select}) => {
    const [categories] = useState([
        'Услуги', 'Транспорт', 'Электроника', 'Бытовая техника', 'Недвижимость', 'Животные или растения'
    ])


    return (
        <div className="videohost-categories" style={{display}}>
            {categories.map(el => <p onClick={() => select(el)} className="videohost-category">{el}</p>)}
        </div>
    )
}

export default Categories