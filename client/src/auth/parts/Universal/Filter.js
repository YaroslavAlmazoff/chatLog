import React from "react";
import "./styles/select.css"
import useRandom from "../../../common_hooks/random.hook";

const Filter = ({list, size, setSelect}) => {
    const {randomKey} = useRandom()
    return (
        <div className="filter">
            <select size={size} className="select-css">
                {list.map(el => <option key={randomKey()} onClick={() => setSelect(el)} className="select-option">{el}</option>)}
            </select> 
        </div>
    )
}

export default Filter