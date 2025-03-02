import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Careers from './pages/Careers'
import Academy from './pages/Academy'
import Auditions from './pages/Auditions'
import Voting from './pages/Voting'
import Streaming from './pages/Streaming'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="app">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/auditions" element={<Auditions />} />
            <Route path="/voting" element={<Voting />} />
            <Route 
              path="/streaming" 
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Streaming />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return children
}

export default App
