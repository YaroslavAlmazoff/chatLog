import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import RecipientItem from "./RecipientItem"
import '../../styles/recipients-list.css'

const RecipientsList = ({file, recipientsDisplay}) => {
    const [recipients, setRecipients] = useState([])
    useEffect(() => {
        const getRecipients = async () => {
            const response = await api.get('/api/users')
            setRecipients(response.data.users)
        }
        getRecipients()
    }, [])
    return (
        <div className="recipients-list" style={{display: recipientsDisplay}}>
            <p style={{color: 'white'}}>Выберите, кому отправить ссылку на файл:</p>
            {recipients.map(item => <RecipientItem item={item} file={file} />)}
        </div>
    )
}

export default RecipientsList