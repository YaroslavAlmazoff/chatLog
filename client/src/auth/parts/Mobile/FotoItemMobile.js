import React, { useEffect, useState } from "react"
import useFiles from "../../../common_hooks/files.hook"

const FotoItemMobile = ({imageUrl}) => {
    const {getFoto} = useFiles()
    const [imageCode, setImageCode] = useState('')

    useEffect(() => {
        getFoto(imageUrl).then((data) => {
            const result = 'data:image/jpeg;base64,' + data
            console.log(result)
            setImageCode(result)
                
        }) 
    }, [])

    return (
        <div>
            <img className="user-foto-preview-mobile" alt="" src={imageCode}/>
        </div>
    )
}

export default FotoItemMobile