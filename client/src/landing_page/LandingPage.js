import { Link } from 'react-router-dom'
import './landing-page.css'
import Register from '../auth/Register'
import Login from '../auth/Login'
import SupportPage from './SupportPage'

const LandingPage = () => {

    return (
        <div className='landing_page'>
            <h1 className='landing_page_title'>Социальная сеть Chatlog.ru</h1>
            <hr />
            <ul className='landing_page_list'>
                <li className='landing_page_list_item'>Новости</li>
                <li className='landing_page_list_item'>Мессенджер</li>
                <li className='landing_page_list_item'>Файловое хранилище</li>
                <li className='landing_page_list_item'>Объявления</li>
                <li className='landing_page_list_item'>Реклама</li>
            </ul>
            <hr />
            <div className='landing_page_actions'>
                <Link to={<Register />}>Зарегистрироваться</Link>
                <Link to={<Login />}>Войти</Link>
            </div>
            <img className='landing_page_image' src={require('./img/landing_page_image_1.jpg')} alt='landing page' />
            <p className='landing_page_text'>Chatlog.ru - это уютная и безопасная 
            социальная сеть. Здесь можно вести свой блог, заводить друзей, 
            переписываться, обмениваться файлами, в удобной форме создавать
             и выкладывать объявления и рекламу.</p>
            <hr />
            <p className='landing_page_support'>Если возникла проблема с 
            работоспособностью соцсети, вы нашли баг или ошибку, пожалуйста,
            сообщите об этом <Link to={<SupportPage />}>нам</Link>. Мы быстро исправим проблему.
            </p>
        </div>
    )
}

export default LandingPage