import MyChannel from '../components/MyChannel'
import RecommendedVideosMain from '../components/RecommendedVideosMain'
import api from '../../../auth/api/auth'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import Categories from '../components/Categories'

const VideohostMain = () => {
    const auth = useContext(AuthContext)
    const [categoriesDisplay, setCategoriesDsiplay] = useState('flex')

    useEffect(() => {
        const checkCategories = async () => {
            const response = await api.get(`/api/user/${auth.userId}`)
            if(response.data.user.videohostCategories.length !== 0) {
                setCategoriesDsiplay('none')
            } else {
                setCategoriesDsiplay('flex')
            }
        }
        checkCategories()
    }, [auth])

    const select = async (el) => {
        await api.post('/api/videohost/useractions/prefer', {category: el}, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        setCategoriesDsiplay('none')
    }

    return (
        <div className="videohost-main">
            <MyChannel />
            <Categories display={categoriesDisplay} select={select} />
            <RecommendedVideosMain />
        </div>
    )
}

export default VideohostMain