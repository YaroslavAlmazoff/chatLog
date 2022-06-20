import { useState } from "react"
import api from '../auth/api/auth'
import './support-page.css'

const SupportPage = () => {
    const [message, setMessage] = useState('Ваше сообщение...')
    const sendMessage = async () => {
        const response = await api.post('/api/support')
        console.log(response)
    }
    return (
        <div className='support_page'>
            <h3>Подробно опишите проблему:</h3>
            <textarea className="support_page_area" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            <button onClick={sendMessage} className="support_page_send">Отправить</button>
        </div>
    )
}

export default SupportPage