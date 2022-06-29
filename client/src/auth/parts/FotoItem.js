import React, { useEffect, useState } from "react"
import Loader from "../../common_components/Loader"
import useFiles from "../../common_hooks/files.hook"

const FotoItem = ({imageUrl}) => {
    const [loading, setLoading] = useState(false)

    return (
        <div>
            {!loading ? <img className="user-foto-preview" alt="" src={process.env.REACT_APP_API_URL + '/userfotos/' + imageUrl}/>
            : <Loader ml={'0%'} />  }
        </div>
    )
}

export default FotoItem