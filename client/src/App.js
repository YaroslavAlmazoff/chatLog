import './App.css';
import {useRoutes} from './routes'
import Header from './common_components/Header'
import React from 'react'
import {useAuth} from './common_hooks/auth.hook' 
import {AuthContext} from './context/AuthContext'

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
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
