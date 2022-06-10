import React from "react";
import Filter from "./Universal/Filter";

const UsersFilterSide = ({setSelectAge, setSelectCountry}) => {
    const ageList = ['Выберите возраст']
    const countryList = ['Выберите страну', 'Россия', 'Белоруссия', 'Казахстан', 'Грузия', 'Азейбарджан']
    let i = 0
    while(i <= 120) {
        i++
        ageList.push(i)
    }
    return (
        <div className="users-filter-side">
            <Filter list={ageList} size={3} setSelect={setSelectAge} />
            <Filter list={countryList} size={3} setSelect={setSelectCountry} />
        </div>
    )
}

export default UsersFilterSide