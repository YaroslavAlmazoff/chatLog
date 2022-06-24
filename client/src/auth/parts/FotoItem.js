import React, { useEffect, useState } from "react"
import Loader from "../../common_components/Loader"
import useFiles from "../../common_hooks/files.hook"

const FotoItem = ({imageUrl}) => {
    const {getFoto} = useFiles()
    const [imageCode, setImageCode] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getFoto(imageUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            console.log(result)
            setImageCode(result)
            setLoading(false)
        }) 
    }, [])

    return (
        <div>
            {!loading ? <img className="user-foto-preview" alt="" src={imageCode}/>
            : <Loader ml={'0%'} />  }
        </div>
    )
}

export default FotoItem