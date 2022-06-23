import { useEffect, useState } from "react"
import api from '../../../auth/api/auth'
import LinkRecipientItem from "./LinkRecipientItem"
import '../../styles/recipients-list.css'

const LinkRecipientsList = ({file, linkRecipientsDisplay}) => {
    const [recipients, setRecipients] = useState([])
    useEffect(() => {
        const getRecipients = async () => {
            const response = await api.get('/api/users')
            setRecipients(response.data.users)
        }
        getRecipients()
    }, [])
    return (
        <div className="recipients-list" style={{display: linkRecipientsDisplay}}>
            <p style={{color: 'white'}}>Выберите, кому отправить ссылку на файл:</p>
            {recipients.map(item => <LinkRecipientItem item={item} file={file} />)}
        </div>
    )
}

export default LinkRecipientsList