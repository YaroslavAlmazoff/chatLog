import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import Foto from "./components/Foto"
import '../../styles/fotos.css'
import { useParams } from "react-router"

const Fotos = ({pub}) => {
    const params = useParams()
    const [fotos, setFotos] = useState([])

    useEffect(() => {
        const getFotos = async () => {
            const response = await api.get(`/api/public/firstfotos/${params.id}`)
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