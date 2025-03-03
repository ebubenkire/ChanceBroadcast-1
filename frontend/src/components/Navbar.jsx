import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isAuthenticated = authService.isAuthenticated()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }

    return () => {
      document.body.classList.remove('menu-open')
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            ChanceTv
            <span className="brand-dot">.</span>
          </Link>
        </div>

        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-content ${isMenuOpen ? 'show' : ''}`}>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <div className="dropdown">
              <span className="dropdown-trigger">Services</span>
              <div className="dropdown-content">
                <Link to="/events">Events</Link>
                <Link to="/careers">Careers</Link>
                <Link to="/academy">Academy</Link>
                <Link to="/auditions">Auditions</Link>
              </div>
            </div>
            <Link to="/voting">Voting</Link>
            <Link to="/streaming">Streaming</Link>
          </div>

          <div className="auth-links">
            {isAuthenticated ? (
              <>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="btn-logout">
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  <i className="fas fa-user"></i>
                  Login
                </Link>
                <Link to="/register" className="btn-register">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 