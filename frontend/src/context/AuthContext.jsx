import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkAuth()
    } else {
      setIsLoading(false)
    }
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/user')
      setUser(data)
      setIsAuthenticated(true)
    } catch (err) {
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials)
    localStorage.setItem('token', data.token)
    setUser(data.user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      isLoading,
      login,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
} 