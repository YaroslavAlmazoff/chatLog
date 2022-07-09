import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Foto from "./components/Foto"
import '../../../styles/fotos.css'

const Fotos = ({pub}) => {
    const [fotos, setFotos] = useState([])

    useEffect(() => {
        const getFotos = async () => {
            const response = await api.get(`/api/public/firstfotos/${pub._id}`)
            setFotos(response.data.fotos)
        }
        getFotos()
    }, [pub])

    return (
        <div className="public-fotos">
            {fotos.map(item => <Foto item={item} />)}
        </div>
    )
}

export default Fotos