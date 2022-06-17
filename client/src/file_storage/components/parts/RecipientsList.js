import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import RecipientItem from "./RecipientItem"

const RecipientsList = ({file, recipientsDisplay}) => {
    const [recipients, setRecipients] = useState([])
    useEffect(() => {
        const getRecipients = async () => {
            const response = await api.get('/api/users')
            setRecipients(response.data.users)
        }
        getRecipients()
    })
    return (
        <div style={{display: recipientsDisplay}}>
            {recipients.map(item => <RecipientItem item={item} file={file} />)}
        </div>
    )
}

export default RecipientsList