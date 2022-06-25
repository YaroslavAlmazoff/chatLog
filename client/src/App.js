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
      console.log(isVerified, 
        isAuthenticated, 
        localStorage.getItem('user'), 
        JSON.parse(localStorage.getItem('user')),
        JSON.parse(localStorage.getItem('user')).token,
        response
        )
    }
    verify()
  }, [auth])

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>

      <div className="App">
        <Header isVerified={isVerified}/>
          {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
