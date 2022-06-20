import './App.css';
import {useRoutes} from './routes'
import Header from './common_components/Header'
import React, { useEffect } from 'react'
import {useAuth} from './common_hooks/auth.hook' 
import {AuthContext} from './context/AuthContext'
import api from './auth/api/auth'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  useEffect(() => {
    const setVisit = async () => {
      await api.get('/api/admin/setvisit')
    }
    setVisit()
  }, [])

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <div className="App">
        <Header/>
          {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
