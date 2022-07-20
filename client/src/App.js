import './App.css';
import {useRoutes} from './routes'
import Header from './common_components/Header'
import React, { useEffect, useContext, useState } from 'react'
import {useAuth} from './common_hooks/auth.hook' 
import {AuthContext} from './context/AuthContext'
import api from './auth/api/auth'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const auth = useContext(AuthContext)
  const [isVerified, setIsVerified] = useState(false)
  const [theme, setTheme] = useState('')
  const routes = useRoutes(isAuthenticated, isVerified)
  useEffect(() => {
    const setVisit = async () => {
      await api.get('/api/admin/setvisit')
    }
    setVisit()
    const verify = async () => {
      const response = await api.get('api/verify', {headers:{
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }})
      setIsVerified(response.data.verified)
    }
    verify()
  }, [auth])
  useEffect(() => {
    setTheme(require(`./homepage/img/backgrounds/${localStorage.getItem('theme')}/${Math.floor(Math.random() * 5) + 1}.jpg`))
  }, [])

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

      <div className="App" style={{backgroundImage: `url(${theme})`}}>
        <Header isVerified={isVerified}/>
          {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
