import React from "react"
import Loader from "../../../common_components/Loader"

const FotoItemMobile = ({imageUrl}) => {

    return (
        <div>
            <img className="user-foto-preview-mobile" alt="" src={process.env.REACT_APP_API_URL + `/userfotos/` + imageUrl}/>
            : <Loader ml={'0%'} />
        </div>
    )
}

export default FotoItemMobile